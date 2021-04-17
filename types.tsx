export type RootStackParamList = {
  Login: undefined;
  Root: undefined;
  Chat: { chatId: string };
  NotFound: undefined;
};

export type BottomTabParamList = {
  Chats: undefined;
  Settings: undefined;
};

export type ChatParamList = {
  ChatScreen: { chatId: string };
};

export type ChatsParamList = {
  ChatsScreen: undefined;
};

export type SettingsParamList = {
  SettingsScreen: undefined;
};
