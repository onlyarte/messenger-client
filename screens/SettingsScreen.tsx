import * as React from 'react';
import { StyleSheet, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { View } from '../components/Themed';

import { RootStackParamList } from '../types';
import { AuthContext } from '../AuthContext';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Root'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function SettingsScreen({ navigation }: Props) {
  const { setToken } = React.useContext(AuthContext);

  const handleLogout = async () => {
    setToken(undefined);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container}>
      <Button onPress={handleLogout} title="Log out" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
