import React from "react";

import { NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SettingsScreen, PostCommentScreen } from "@screens";

import { AppTabBottomTabParamList, AppTabNavigator } from "./AppTabNavigator";
export type AppStackParamList = {
  AppTabNavigator: NavigatorScreenParams<AppTabBottomTabParamList>;
  PostCommentScreen: { postId: number; postAuthorId: number };
  SettingsScreen: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={"AppTabNavigator"} component={AppTabNavigator} />
      <Stack.Screen name={"PostCommentScreen"} component={PostCommentScreen} />
      <Stack.Screen name={"SettingsScreen"} component={SettingsScreen} />
    </Stack.Navigator>
  );
}
