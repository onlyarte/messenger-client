import React from 'react';
import {
  ApolloClient,
  ApolloProvider as ApolloProviderBase,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';

import { AuthContext } from './AuthContext';

export function ApolloProvider({ children }: { children?: React.ReactNode }) {
  const { token } = React.useContext(AuthContext);

  const client = React.useMemo(() => {
    // const httpLink = createHttpLink({
    //   uri: __DEV__
    //     ? 'http://192.168.0.101:4000'
    //     : 'https://remessage-api.herokuapp.com',
    // });

    // const authLink = setContext(async (_, { headers }) => {
    //   return {
    //     headers: {
    //       ...headers,
    //       authorization: token ? `Bearer ${token}` : '',
    //     },
    //   };
    // });

    const wsLink = new WebSocketLink({
      uri: __DEV__
        ? 'ws://192.168.0.102:4000'
        : 'ws://remessage-api.herokuapp.com',
      options: {
        reconnect: true,
        connectionParams: { Authorization: token && `Bearer ${token}` },
      },
    });

    return new ApolloClient({
      // link: authLink.concat(httpLink),
      link: wsLink,
      cache: new InMemoryCache(),
    });
  }, [token]);

  return <ApolloProviderBase client={client}>{children}</ApolloProviderBase>;
}
