import * as React from 'react';
import {
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/stack';

import { View, TextInput, Text } from '../components/Themed';
import Message from '../components/Message';

import {
  useChatQuery,
  useMeQuery,
  useMessagesQuery,
  useSendMessageMutation,
} from '../codegen/generated/graphql';
import { RootStackParamList } from '../types';


type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

type ChatsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Chat'
>;

type Props = {
  route: ChatScreenRouteProp;
  navigation: ChatsScreenNavigationProp;
};

export default function ChatScreen({ route, navigation }: Props) {
  const { chatId } = route.params;

  const { data: authData } = useMeQuery();

  const { data: chatData } = useChatQuery({ variables: { chatId } });

  React.useEffect(() => {
    if (chatData?.chat) {
      navigation.setOptions({
        title: chatData.chat.name || undefined,
      });
    }
  }, [chatData?.chat]);

  const { data: messagesData, refetch: refetchMessages } = useMessagesQuery({
    variables: { chatId },
    pollInterval: 500,
  });

  const [message, setMessage] = React.useState('');
  const [sendMessage] = useSendMessageMutation();

  const handleSubmit = async () => {
    await sendMessage({ variables: { chatId, text: message } });
    await refetchMessages({ chatId });
    setMessage('');
  };

  const headerHeight = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={headerHeight}
      style={styles.container}
    >
      <FlatList
        data={messagesData?.messages || []}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.messages}
        renderItem={({ item }) => (
          <Message
            message={item}
            isMine={item.sender._id === authData?.me._id}
          />
        )}
        inverted
      />
      {!messagesData?.messages.length && (
        <Text style={styles.text}>
          No messages yet. Say hi to {chatData?.chat.name}!
        </Text>
      )}
      <View style={styles.form}>
        <TextInput
          placeholder="Send message..."
          value={message}
          onChangeText={setMessage}
          returnKeyType="send"
          enablesReturnKeyAutomatically
          onSubmitEditing={handleSubmit}
          style={styles.input}
        />
        <Ionicons
          name="md-send"
          onPress={handleSubmit}
          style={styles.iconButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  messages: {
    flexDirection: 'column',
    padding: 10,
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 7,
  },
  input: {
    flexGrow: 1,
    maxWidth: '90%',
  },
  iconButton: {
    fontSize: 30,
    padding: 5,
    borderRadius: 30,
    color: 'blue',
  },
  text: {
    alignSelf: 'center',
    marginBottom: 8,
    color: 'gray',
    maxWidth: '90%',
  },
});
