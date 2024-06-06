import React from "react";

import { NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  SettingsScreen,
  PostCommentScreen,
  ProfileScreen,
  SearchScreen,
  PublishPostScreen,
  CameraScreen,
} from "@screens";

import { AppTabBottomTabParamList, AppTabNavigator } from "./AppTabNavigator";
export type AppStackParamList = {
  AppTabNavigator: NavigatorScreenParams<AppTabBottomTabParamList>;
  CameraScreen: undefined;
  PostCommentScreen: { postId: number; postAuthorId: number };
  ProfileScreen: { userId: number };
  PublishPostScreen: { imageUri: string };
  SearchScreen: undefined;
  SettingsScreen: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

interface Props {
  initialRouteName?: keyof AppStackParamList;
}

export function AppStack({ initialRouteName = "AppTabNavigator" }: Props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={initialRouteName}
    >
      <Stack.Screen name={"AppTabNavigator"} component={AppTabNavigator} />
      <Stack.Screen name={"CameraScreen"} component={CameraScreen} />
      <Stack.Screen name={"PostCommentScreen"} component={PostCommentScreen} />
      <Stack.Screen name={"ProfileScreen"} component={ProfileScreen} />
      <Stack.Screen name={"PublishPostScreen"} component={PublishPostScreen} />
      <Stack.Screen name={"SearchScreen"} component={SearchScreen} />
      <Stack.Screen name={"SettingsScreen"} component={SettingsScreen} />
    </Stack.Navigator>
  );
}
