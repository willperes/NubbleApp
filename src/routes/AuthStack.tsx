import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { IconProps } from "@components";
import {
  LoginScreen,
  SignUpScreen,
  SuccessScreen,
  ForgotPasswordScreen,
} from "@screens";

export type AuthStackParamList = {
  LoginScreen: undefined;
  ForgotPasswordScreen: undefined;
  SignUpScreen: undefined;
  SuccessScreen: {
    title: string;
    description: string;
    iconProps: Pick<IconProps, "name" | "color">;
  };
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName={"LoginScreen"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={"LoginScreen"} component={LoginScreen} />
      <Stack.Screen
        name={"ForgotPasswordScreen"}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen name={"SignUpScreen"} component={SignUpScreen} />
      <Stack.Screen name={"SuccessScreen"} component={SuccessScreen} />
    </Stack.Navigator>
  );
}
