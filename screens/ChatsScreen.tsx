import * as React from 'react';
import {
  FlatList,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  Button,
  Keyboard,
  SectionListData,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Text, View, TextInput } from '../components/Themed';

import { RootStackParamList } from '../types';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import {
  useChatsQuery,
  ChatDataFragment,
  useUsersLazyQuery,
  UserDataFragment,
  useStartChatMutation,
} from '../codegen/generated/graphql';

type ChatItemProps = {
  chat: ChatDataFragment;
  onPress: () => void;
};

function ChatItem({ chat, onPress }: ChatItemProps) {
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity
      style={[
        styles.item,
        { borderBottomColor: colorScheme && Colors[colorScheme].gray4 },
      ]}
      onPress={onPress}
    >
      <Text style={styles.title}>{chat.name}</Text>
      <Text style={styles.message}>
        {chat.lastMessage ? chat.lastMessage.text : 'No messages yet...'}
      </Text>
    </TouchableOpacity>
  );
}

type UserItemProps = {
  user: UserDataFragment;
  onPress: () => void;
};

function UserItem({ user, onPress }: UserItemProps) {
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity
      style={[
        styles.item,
        { borderBottomColor: colorScheme && Colors[colorScheme].gray4 },
      ]}
      onPress={onPress}
    >
      <Text style={styles.title}>{user.fullName}</Text>
    </TouchableOpacity>
  );
}

type ChatsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Root'
>;

type Props = {
  navigation: ChatsScreenNavigationProp;
};

export default function ChatsScreen({ navigation }: Props) {
  const { data: chatsData } = useChatsQuery({ pollInterval: 500 });

  const handleChatSelect = (chatId: string) => {
    navigation.navigate('Chat', { chatId });
  };

  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleCancel = () => {
    setSearchQuery('');
    setIsSearchFocused(false);
    Keyboard.dismiss();
  };

  const [fetchUsers, { data: usersData }] = useUsersLazyQuery();
  const [startChat] = useStartChatMutation();

  const handleUserSelect = async (userId: string) => {
    let chat = chatsData?.chats?.find(
      (chat) => chat.memberIds.length === 2 && chat.memberIds.includes(userId)
    );
    if (!chat) {
      const { data: chatData } = await startChat({
        variables: { members: [userId] },
      });
      chat = chatData?.startChat;
    }
    if (chat) {
      navigation.navigate('Chat', { chatId: chat._id });
    }
  };

  React.useEffect(() => {
    if (searchQuery) {
      fetchUsers({ variables: { query: searchQuery } });
    }
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <View
        style={styles.form}
        lightColor={Colors.light.gray7}
        darkColor={Colors.dark.gray7}
      >
        <TextInput
          placeholder="Search chats and people..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsSearchFocused(true)}
          onEndEditing={() => setIsSearchFocused(false)}
          returnKeyType="search"
          enablesReturnKeyAutomatically
          style={styles.input}
        />
        {(isSearchFocused || !!searchQuery) && (
          <Button onPress={handleCancel} title="Cancel" />
        )}
      </View>

      {searchQuery ? (
        <SectionList<any>
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.title}>{section.title}</Text>
            </View>
          )}
          sections={[
            {
              title: 'Chats',
              data: (chatsData?.chats || []).filter((chat) =>
                chat.name?.toLowerCase().includes(searchQuery.toLowerCase())
              ),
              renderItem: ({ item }) => (
                <ChatItem
                  chat={item}
                  onPress={() => handleChatSelect(item._id)}
                />
              ),
            } as SectionListData<ChatDataFragment>,
            {
              title: 'Users',
              data: usersData?.users || [],
              renderItem: ({ item }) => (
                <UserItem
                  user={item}
                  onPress={() => handleUserSelect(item._id)}
                />
              ),
            } as SectionListData<UserDataFragment>,
          ]}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <FlatList
          data={chatsData?.chats || []}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ChatItem chat={item} onPress={() => handleChatSelect(item._id)} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    overflow: 'scroll',
  },
  item: {
    minWidth: '100%',
    padding: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    marginTop: 4,
    fontSize: 14,
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  input: {
    flexGrow: 1,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
