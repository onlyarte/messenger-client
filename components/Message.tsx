import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { MessageDataFragment } from '../codegen/generated/graphql';
import { transparentize } from 'polished';

type Props = {
  message: MessageDataFragment;
  isMine: boolean;
};

export default function Message({ message, isMine }: Props) {
  return (
    <View style={[styles.message, isMine ? styles.my : styles.their]}>
      <Text style={styles.text}>{message.text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  message: {
    marginVertical: 5,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxWidth: '80%',
  },
  my: {
    alignSelf: 'flex-end',
    backgroundColor: transparentize(0.7, '#808080'),
  },
  their: {
    alignSelf: 'flex-start',
    backgroundColor: transparentize(0, '#0B84FF'),
  },
  text: {
    fontSize: 14,
    color: 'white',
  },
});
