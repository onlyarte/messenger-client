import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, FlatList } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { Text, View, TextInput } from '../components/Themed';

import { RootStackParamList } from '../types';
import { useChatQuery, useMessagesQuery, useSendMessageMutation, MessagesDocument } from '../codegen/generated/graphql';

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

  const { data } = useChatQuery({ variables: { chatId } });

  React.useEffect(() => {
    if (data?.chat) {
      navigation.setOptions({
        title: data.chat.name || undefined,
      });
    }
  }, [data?.chat]);

  const { data: messagesData, refetch: refetchMessages } = useMessagesQuery({ variables: { chatId } });

  const [message, setMessage] = React.useState('');
  const [sendMessage] = useSendMessageMutation();

  const handleSubmit = async () => {
    await sendMessage({ variables: { chatId, text: message } });
    await refetchMessages();
    setMessage('');
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <FlatList
        data={messagesData?.messages || []}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.messages}
        renderItem={({ item: message }) => (
          <View style={styles.message} key={message._id}>
            <Text style={styles.text}>{message.text}</Text>
          </View>
        )}
      />
      <View style={styles.form}>
        <TextInput
          placeholder="Send message..."
          value={message}
          onChangeText={setMessage}
          autoCompleteType="username"
          style={styles.input}
        />
        <Ionicons name="md-send" onPress={handleSubmit} style={styles.iconButton} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  messages: {
    flexDirection: 'column-reverse',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 15,
  },
  message: {
    marginVertical: 5,
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'blue',
  },
  text: {
    fontSize: 14,
    color: 'white',
  },
  form: {
    minWidth: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 7,
  },
  input: {
    flexGrow: 1,
  },
  iconButton: {
    fontSize: 30,
    padding: 5,
    borderRadius: 30,
    color: 'blue',
  },
});
