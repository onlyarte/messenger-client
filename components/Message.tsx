import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { MessageDataFragment } from '../codegen/generated/graphql';
import { transparentize } from 'polished';

import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

type Props = {
  message: MessageDataFragment;
  isMine: boolean;
};

export default function Message({ message, isMine }: Props) {
  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        styles.message,
        isMine
          ? {
              alignSelf: 'flex-end',
              backgroundColor: Colors[colorScheme].gray2,
            }
          : {
              alignSelf: 'flex-start',
              backgroundColor: Colors[colorScheme].blue,
            },
      ]}
    >
      <Text style={styles.text}>{message.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    marginVertical: 5,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxWidth: '80%',
  },
  text: {
    fontSize: 14,
    color: '#fff',
  },
});
