import * as React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Text, View } from '../components/Themed';

import { RootStackParamList } from '../types';
import { useChatsQuery, ChatDataFragment } from '../codegen/generated/graphql';

function Item({
  chat,
  onPress,
}: {
  chat: ChatDataFragment;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.title}>{chat.name}</Text>
      <Text style={styles.message}>
        {chat.lastMessage ? chat.lastMessage.text : 'No messages yet...'}
      </Text>
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
  const { data } = useChatsQuery({ pollInterval: 500 });

  const handleSelect = (chatId: string) => {
    navigation.navigate('Chat', { chatId });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.chats || []}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Item chat={item} onPress={() => handleSelect(item._id)} />
        )}
      />
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
    borderBottomColor: 'gray',
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
});
