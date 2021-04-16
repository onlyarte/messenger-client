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

export type ChatDataFragment = (
  { __typename?: 'Chat' }
  & Pick<Chat, '_id' | 'name' | 'isPublic' | 'updatedAt' | 'memberIds' | 'adminIds'>
  & { lastMessage?: Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, '_id' | 'createdAt' | 'text'>
    & { sender: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'firstName' | 'lastName'>
    ) }
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

export const ChatDataFragmentDoc = gql`
    fragment ChatData on Chat {
  _id
  name
  isPublic
  updatedAt
  memberIds
  adminIds
  lastMessage {
    _id
    sender {
      _id
      firstName
      lastName
    }
    createdAt
    text
  }
}
    `;
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