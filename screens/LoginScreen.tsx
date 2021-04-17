import * as React from 'react';
import {
  StyleSheet,
  Platform,
  Button,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Text, TextInput } from '../components/Themed';

import { RootStackParamList } from '../types';
import { useLoginMutation } from '../codegen/generated/graphql';
import { AuthContext } from '../AuthContext';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({ navigation }: Props) {
  const { setToken } = React.useContext(AuthContext);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [login] = useLoginMutation({
    variables: { username, password },
  });

  const handleSubmit = async () => {
    try {
      const result = await login();
      if (result.data?.login.token) {
        setToken(result.data.login.token);
      }
      navigation.reset({
        index: 0,
        routes: [{ name: 'Root' }],
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
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
        returnKeyType="go"
        onSubmitEditing={handleSubmit}
      />
      <Button onPress={handleSubmit} title="Log in" />
    </KeyboardAvoidingView>
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
