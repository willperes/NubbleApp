import React from "react";
import { Text } from "../../../components/Text/Text";
import { TextInput } from "../../../components/TextInput/TextInput";
import { Button } from "../../../components/Button/Button";
import { Screen } from "../../../components/Screen/Screen";
import { PasswordInput } from "../../../components/PasswordInput/PasswordInput";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../../../routes/Routes";
import { Controller, useForm } from "react-hook-form";

type LoginForm = {
    email: string;
    password: string;
};

type ScreenProps = NativeStackScreenProps<RootStackParamList, "LoginScreen">;

export function LoginScreen({ navigation }: ScreenProps) {
    const { control, formState, handleSubmit } = useForm<LoginForm>({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    function submitForm(formValues: LoginForm): void {
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

            <Controller
                control={control}
                name={"email"}
                rules={{
                    required: "E-mail obrigatório",
                    pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Insira um e-mail válido",
                    },
                }}
                render={({ field, fieldState }) => (
                    <TextInput
                        value={field.value}
                        onChangeText={field.onChange}
                        errorMessage={fieldState.error?.message}
                        label={"E-mail"}
                        placeholder={"Digite seu e-mail"}
                        boxProps={{ mb: "s20" }}
                    />
                )}
            />

            <Controller
                control={control}
                name={"password"}
                rules={{
                    required: "Senha obrigatória",
                    minLength: {
                        value: 8,
                        message: "Senha deve ter no mínimo 8 caracteres",
                    },
                }}
                render={({ field, fieldState }) => (
                    <PasswordInput
                        value={field.value}
                        onChangeText={field.onChange}
                        errorMessage={fieldState.error?.message}
                        label={"Senha"}
                        placeholder={"Digite sua senha"}
                        boxProps={{ mb: "s10" }}
                    />
                )}
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
