import * as React from 'react';
import { StyleSheet, Button, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text, View, TextInput } from '../components/Themed';

import { RootStackParamList } from '../types';
import { useLoginMutation } from '../codegen/generated/graphql';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({ navigation }: Props) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [login] = useLoginMutation({
    variables: { username, password },
  });

  const handleSubmit = async () => {
    try {
      const result = await login();
      if (result.data?.login.token) {
        await AsyncStorage.setItem('token', result.data.login.token);
      }
      navigation.navigate('Root');
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCompleteType="username"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        autoCompleteType="password"
        secureTextEntry
        style={styles.input}
      />
      <Button
        onPress={handleSubmit}
        title="Log in"
        // color="#841584"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    maxWidth: 240,
  },
});
