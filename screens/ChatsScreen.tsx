import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

import { useChatsQuery, ChatDataFragment } from '../codegen/generated/graphql';

function Item({ item }: { item: ChatDataFragment }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      {item.lastMessage && (
        <Text style={styles.message}>{item.lastMessage.text}</Text>
      )}
    </View>
  );
}

export default function ChatsScreen() {
  const { data, loading, error } = useChatsQuery();

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.chats || []}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Item item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    overflow: 'scroll',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  item: {
    minWidth: '100%',
    padding: 20,
    borderBottomColor: 'ghostwhite',
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
