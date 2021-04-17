import React from 'react';
import { Platform, StyleSheet, KeyboardAvoidingView, FlatList } from 'react-native';
import { useThemeColor } from './Themed';
import { Text, View, TextInput } from '../components/Themed';
import { MessageDataFragment } from '../codegen/generated/graphql';
import Colors from '../constants/Colors';
import { transparentize } from 'polished';

type Props = {
  message: MessageDataFragment;
  isMine: boolean;
};

export default function Message({ message, isMine }: Props) {
  return (
    <View style={{ height: 1, width: '100%', backgroundColor:  }} key={message._id} />
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
