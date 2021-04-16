import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const client = new ApolloClient({
  uri: __DEV__ ? '192.168.0.101:4000' : undefined,
  cache: new InMemoryCache()
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
}
