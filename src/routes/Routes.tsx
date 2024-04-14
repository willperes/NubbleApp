import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { LoginScreen } from "../screens/auth/LoginScreen/LoginScreen";
import { SignUpScreen } from "../screens/auth/SignUpScreen/SignUpScreen";

export type RootStackParamList = {
    LoginScreen: undefined;
    SignUpScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export function Router() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={"LoginScreen"}
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name={"LoginScreen"} component={LoginScreen} />
                <Stack.Screen name={"SignUpScreen"} component={SignUpScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
