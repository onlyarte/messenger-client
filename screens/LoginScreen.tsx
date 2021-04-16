import * as React from 'react';
import { StyleSheet, Button, Alert } from 'react-native';

import { Text, View, TextInput } from '../components/Themed';

import { useLoginMutation } from '../codegen/generated/graphql';

export default function LoginScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [login] = useLoginMutation({
    variables: { username, password },
  });

  const handleSubmit = async () => {
    const result = await login();
    Alert.alert(`Successfully logged in. Your token is ${result.data?.login.token}.`);
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
