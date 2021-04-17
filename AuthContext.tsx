import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

export type AuthContextValue = {
  token?: string;
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  isInitialized: boolean;
};

export const AuthContext = React.createContext<AuthContextValue>({
  token: undefined,
  setToken: function () {},
  isInitialized: false,
});

type AuthProviderProps = {
  children?: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [token, setToken] = React.useState<string>();

  React.useEffect(() => {
    AsyncStorage.getItem('token')
      .then((cached) => {
        setToken(cached || undefined);
        setIsInitialized(true)
      });
  }, []);

  React.useEffect(() => {
    if (token) AsyncStorage.setItem('token', token);
    else AsyncStorage.removeItem('token');
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, isInitialized }}>
      {children}
    </AuthContext.Provider>
  );
}
