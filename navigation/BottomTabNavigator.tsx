import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import ChatsScreen from '../screens/ChatsScreen';
import SettingsScreen from '../screens/SettingsScreen';

import {
  BottomTabParamList,
  ChatsParamList,
  SettingsParamList,
} from '../types';

import Colors from '../constants/Colors';
import useNotifications from '../hooks/useNotifications';
import useColorScheme from '../hooks/useColorScheme';
import { useNewMessageSubscription } from '../codegen/generated/graphql';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const sendNotification = useNotifications();

  const { data } = useNewMessageSubscription();

  React.useEffect(() => {
    if (data) {
      sendNotification({
        content: {
          title: `New message from ${data.newMessage.sender.fullName}`,
          body: data.newMessage.text || '📎 attachment',
          data: { data: 'goes here' },
        },
        trigger: null,
      });
    }
  }, [data]);

  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Chats"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Chats"
        component={ChatsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-chatbubbles" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-settings" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ChatsStack = createStackNavigator<ChatsParamList>();

function ChatsNavigator() {
  return (
    <ChatsStack.Navigator>
      <ChatsStack.Screen
        name="ChatsScreen"
        component={ChatsScreen}
        options={{ headerTitle: 'Chats' }}
      />
    </ChatsStack.Navigator>
  );
}

const SettingsStack = createStackNavigator<SettingsParamList>();

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerTitle: 'Settings' }}
      />
    </SettingsStack.Navigator>
  );
}
