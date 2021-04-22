import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};

export type Chat = {
  __typename?: 'Chat';
  _id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  memberIds: Array<Scalars['ID']>;
  members: Array<User>;
  adminIds: Array<Scalars['ID']>;
  admins: Array<User>;
  messages: Array<Message>;
  lastMessage?: Maybe<Message>;
  updatedAt: Scalars['String'];
};


export type ChatMessagesArgs = {
  search?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type ChatMember = {
  __typename?: 'ChatMember';
  chat: Chat;
  member: User;
};

export type Message = {
  __typename?: 'Message';
  _id: Scalars['ID'];
  senderId: Scalars['ID'];
  sender: User;
  chatId: Scalars['ID'];
  chat: Chat;
  text?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  isNew: Scalars['Boolean'];
  offset?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  signup: AuthPayload;
  login: AuthPayload;
  startChat: Chat;
  leaveChat: Chat;
  addChatMember: Chat;
  removeChatMember: Chat;
  assignChatAdmin: Chat;
  renameChat: Chat;
  sendMessage: Message;
  readMessages: Array<Message>;
  subscribeToNotifications: Scalars['Boolean'];
};


export type MutationSignupArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};


export type MutationLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type MutationStartChatArgs = {
  name?: Maybe<Scalars['String']>;
  members?: Maybe<Array<Scalars['ID']>>;
  link?: Maybe<Scalars['String']>;
  isPublic?: Maybe<Scalars['Boolean']>;
};


export type MutationLeaveChatArgs = {
  chat: Scalars['ID'];
};


export type MutationAddChatMemberArgs = {
  chat: Scalars['ID'];
  member: Scalars['ID'];
};


export type MutationRemoveChatMemberArgs = {
  chat: Scalars['ID'];
  member: Scalars['ID'];
};


export type MutationAssignChatAdminArgs = {
  chat: Scalars['ID'];
  admin: Scalars['ID'];
};


export type MutationRenameChatArgs = {
  chat: Scalars['ID'];
  name: Scalars['String'];
};


export type MutationSendMessageArgs = {
  chat: Scalars['ID'];
  text: Scalars['String'];
};


export type MutationReadMessagesArgs = {
  chat: Scalars['ID'];
  messages: Array<Scalars['ID']>;
};


export type MutationSubscribeToNotificationsArgs = {
  pushToken: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  title: Scalars['String'];
  me: User;
  users: Array<User>;
  chat: Chat;
  chats: Array<Chat>;
  message: Message;
  messages: Array<Message>;
};


export type QueryUsersArgs = {
  query?: Maybe<Scalars['String']>;
};


export type QueryChatArgs = {
  id?: Maybe<Scalars['ID']>;
  link?: Maybe<Scalars['String']>;
};


export type QueryMessageArgs = {
  id: Scalars['ID'];
};


export type QueryMessagesArgs = {
  chat: Scalars['ID'];
  search?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newChat: Chat;
  joinedChat: ChatMember;
  leftChat: ChatMember;
  newMessage: Message;
};


export type SubscriptionLeftChatArgs = {
  chat?: Maybe<Scalars['ID']>;
};


export type SubscriptionNewMessageArgs = {
  chat?: Maybe<Scalars['ID']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  fullName: Scalars['String'];
  isEnabled?: Maybe<Scalars['Boolean']>;
  chats: Array<Chat>;
};

export type UserDataFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'username' | 'fullName'>
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
    & { user: (
      { __typename?: 'User' }
      & UserDataFragment
    ) }
  ) }
);

export type SubscribeToNotificationsMutationVariables = Exact<{
  pushToken: Scalars['String'];
}>;


export type SubscribeToNotificationsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'subscribeToNotifications'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & UserDataFragment
  ) }
);

export type ChatDataFragment = (
  { __typename?: 'Chat' }
  & Pick<Chat, '_id' | 'name' | 'isPublic' | 'updatedAt' | 'memberIds' | 'adminIds'>
  & { lastMessage?: Maybe<(
    { __typename?: 'Message' }
    & MessageDataFragment
  )> }
);

export type ChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type ChatsQuery = (
  { __typename?: 'Query' }
  & { chats: Array<(
    { __typename?: 'Chat' }
    & ChatDataFragment
  )> }
);

export type ChatQueryVariables = Exact<{
  chatId: Scalars['ID'];
}>;


export type ChatQuery = (
  { __typename?: 'Query' }
  & { chat: (
    { __typename?: 'Chat' }
    & ChatDataFragment
  ) }
);

export type MessageDataFragment = (
  { __typename?: 'Message' }
  & Pick<Message, '_id' | 'text' | 'createdAt' | 'isNew'>
  & { sender: (
    { __typename?: 'User' }
    & UserDataFragment
  ) }
);

export type SendMessageMutationVariables = Exact<{
  chatId: Scalars['ID'];
  text: Scalars['String'];
}>;


export type SendMessageMutation = (
  { __typename?: 'Mutation' }
  & { sendMessage: (
    { __typename?: 'Message' }
    & MessageDataFragment
  ) }
);

export type MessagesQueryVariables = Exact<{
  chatId: Scalars['ID'];
}>;


export type MessagesQuery = (
  { __typename?: 'Query' }
  & { messages: Array<(
    { __typename?: 'Message' }
    & MessageDataFragment
  )> }
);

export type NewMessageSubscriptionVariables = Exact<{
  chatId?: Maybe<Scalars['ID']>;
}>;


export type NewMessageSubscription = (
  { __typename?: 'Subscription' }
  & { newMessage: (
    { __typename?: 'Message' }
    & MessageDataFragment
  ) }
);

export const UserDataFragmentDoc = gql`
    fragment UserData on User {
  _id
  username
  fullName
}
    `;
export const MessageDataFragmentDoc = gql`
    fragment MessageData on Message {
  _id
  sender {
    ...UserData
  }
  text
  createdAt
  isNew
}
    ${UserDataFragmentDoc}`;
export const ChatDataFragmentDoc = gql`
    fragment ChatData on Chat {
  _id
  name
  isPublic
  updatedAt
  memberIds
  adminIds
  lastMessage {
    ...MessageData
  }
}
    ${MessageDataFragmentDoc}`;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
      ...UserData
    }
  }
}
    ${UserDataFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SubscribeToNotificationsDocument = gql`
    mutation SubscribeToNotifications($pushToken: String!) {
  subscribeToNotifications(pushToken: $pushToken)
}
    `;
export type SubscribeToNotificationsMutationFn = Apollo.MutationFunction<SubscribeToNotificationsMutation, SubscribeToNotificationsMutationVariables>;

/**
 * __useSubscribeToNotificationsMutation__
 *
 * To run a mutation, you first call `useSubscribeToNotificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubscribeToNotificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [subscribeToNotificationsMutation, { data, loading, error }] = useSubscribeToNotificationsMutation({
 *   variables: {
 *      pushToken: // value for 'pushToken'
 *   },
 * });
 */
export function useSubscribeToNotificationsMutation(baseOptions?: Apollo.MutationHookOptions<SubscribeToNotificationsMutation, SubscribeToNotificationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubscribeToNotificationsMutation, SubscribeToNotificationsMutationVariables>(SubscribeToNotificationsDocument, options);
      }
export type SubscribeToNotificationsMutationHookResult = ReturnType<typeof useSubscribeToNotificationsMutation>;
export type SubscribeToNotificationsMutationResult = Apollo.MutationResult<SubscribeToNotificationsMutation>;
export type SubscribeToNotificationsMutationOptions = Apollo.BaseMutationOptions<SubscribeToNotificationsMutation, SubscribeToNotificationsMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...UserData
  }
}
    ${UserDataFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ChatsDocument = gql`
    query Chats {
  chats {
    ...ChatData
  }
}
    ${ChatDataFragmentDoc}`;

/**
 * __useChatsQuery__
 *
 * To run a query within a React component, call `useChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useChatsQuery(baseOptions?: Apollo.QueryHookOptions<ChatsQuery, ChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChatsQuery, ChatsQueryVariables>(ChatsDocument, options);
      }
export function useChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatsQuery, ChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChatsQuery, ChatsQueryVariables>(ChatsDocument, options);
        }
export type ChatsQueryHookResult = ReturnType<typeof useChatsQuery>;
export type ChatsLazyQueryHookResult = ReturnType<typeof useChatsLazyQuery>;
export type ChatsQueryResult = Apollo.QueryResult<ChatsQuery, ChatsQueryVariables>;
export const ChatDocument = gql`
    query Chat($chatId: ID!) {
  chat(id: $chatId) {
    ...ChatData
  }
}
    ${ChatDataFragmentDoc}`;

/**
 * __useChatQuery__
 *
 * To run a query within a React component, call `useChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useChatQuery(baseOptions: Apollo.QueryHookOptions<ChatQuery, ChatQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChatQuery, ChatQueryVariables>(ChatDocument, options);
      }
export function useChatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatQuery, ChatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChatQuery, ChatQueryVariables>(ChatDocument, options);
        }
export type ChatQueryHookResult = ReturnType<typeof useChatQuery>;
export type ChatLazyQueryHookResult = ReturnType<typeof useChatLazyQuery>;
export type ChatQueryResult = Apollo.QueryResult<ChatQuery, ChatQueryVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($chatId: ID!, $text: String!) {
  sendMessage(chat: $chatId, text: $text) {
    ...MessageData
  }
}
    ${MessageDataFragmentDoc}`;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const MessagesDocument = gql`
    query Messages($chatId: ID!) {
  messages(chat: $chatId) {
    ...MessageData
  }
}
    ${MessageDataFragmentDoc}`;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useMessagesQuery(baseOptions: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const NewMessageDocument = gql`
    subscription NewMessage($chatId: ID) {
  newMessage(chat: $chatId) {
    ...MessageData
  }
}
    ${MessageDataFragmentDoc}`;

/**
 * __useNewMessageSubscription__
 *
 * To run a query within a React component, call `useNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useNewMessageSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewMessageSubscription, NewMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewMessageSubscription, NewMessageSubscriptionVariables>(NewMessageDocument, options);
      }
export type NewMessageSubscriptionHookResult = ReturnType<typeof useNewMessageSubscription>;
export type NewMessageSubscriptionResult = Apollo.SubscriptionResult<NewMessageSubscription>;