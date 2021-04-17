import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Navigation from './navigation';
import { AuthProvider } from './AuthContext';
import { ApolloProvider } from './ApolloContext';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthProvider>
          <ApolloProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </ApolloProvider>
        </AuthProvider>
      </SafeAreaProvider>
    );
  }
}
