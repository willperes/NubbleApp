import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { LoginScreen } from "../screens/auth/LoginScreen/LoginScreen";
import { SignUpScreen } from "../screens/auth/SignUpScreen/SignUpScreen";
import { SuccessScreen } from "../screens/auth/SuccessScreen/SuccessScreen";
import { IconProps } from "../components/Icon/Icon";
import { ForgotPasswordScreen } from "../screens/auth/ForgotPasswordScreen/ForgotPasswordScreen";

export type RootStackParamList = {
    LoginScreen: undefined;
    ForgotPasswordScreen: undefined;
    SignUpScreen: undefined;
    SuccessScreen: {
        title: string;
        description: string;
        iconProps: Pick<IconProps, "name" | "color">;
    };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
                <Stack.Screen
                    name={"ForgotPasswordScreen"}
                    component={ForgotPasswordScreen}
                />
                <Stack.Screen name={"SignUpScreen"} component={SignUpScreen} />
                <Stack.Screen
                    name={"SuccessScreen"}
                    component={SuccessScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
