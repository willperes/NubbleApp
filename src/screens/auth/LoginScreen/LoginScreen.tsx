import React from "react";
import {
    Text,
    Button,
    Screen,
    FormTextInput,
    FormPasswordInput,
} from "@components";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../../../routes/Routes";
import { useForm } from "react-hook-form";
import { LoginSchema, loginSchema } from "./loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";

type ScreenProps = NativeStackScreenProps<RootStackParamList, "LoginScreen">;

export function LoginScreen({ navigation }: ScreenProps) {
    const { control, formState, handleSubmit } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
    });

    function submitForm(formValues: LoginSchema): void {
        console.log("formValues", formValues);
    }

    function navigateToSignUpScreen(): void {
        navigation.navigate("SignUpScreen");
    }

    function navigateToForgotPasswordScreen(): void {
        navigation.navigate("ForgotPasswordScreen");
    }

    return (
        <Screen scrollable>
            <Text preset={"headingLarge"} mb={"s8"}>
                Olá!
            </Text>
            <Text preset={"paragraphLarge"} mb={"s40"}>
                Digite seu e-mail e senha para entrar
            </Text>

            <FormTextInput
                control={control}
                name={"email"}
                label={"E-mail"}
                placeholder={"Digite seu e-mail"}
                boxProps={{ mb: "s20" }}
            />

            <FormPasswordInput
                control={control}
                name={"password"}
                label={"Senha"}
                placeholder={"Digite sua senha"}
                boxProps={{ mb: "s10" }}
            />

            <Text
                preset={"paragraphSmall"}
                weight={"bold"}
                color={"primary"}
                onPress={navigateToForgotPasswordScreen}
            >
                Esqueci minha senha
            </Text>

            <Button
                disabled={!formState.isValid}
                preset={"primary"}
                title={"Entrar"}
                mt={"s48"}
                onPress={handleSubmit(submitForm)}
            />
            <Button
                preset={"outline"}
                title={"Criar uma conta"}
                mt={"s12"}
                onPress={navigateToSignUpScreen}
            />
        </Screen>
    );
}
