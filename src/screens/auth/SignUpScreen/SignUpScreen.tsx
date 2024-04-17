import React from "react";
import { Screen } from "../../../components/Screen/Screen";
import { Text } from "../../../components/Text/Text";
import { TextInput } from "../../../components/TextInput/TextInput";
import { Button } from "../../../components/Button/Button";
import { PasswordInput } from "../../../components/PasswordInput/PasswordInput";
import { useResetNavigationSuccess } from "../../../hooks/useResetNavigationSuccess";
import { Controller, useForm } from "react-hook-form";

type SignUpFormType = {
    username: string;
    fullName: string;
    email: string;
    password: string;
};

export function SignUpScreen() {
    const { control, formState, handleSubmit } = useForm<SignUpFormType>({
        mode: "onChange",
    });

    const { reset } = useResetNavigationSuccess();

    function submitForm(formValues: SignUpFormType): void {
        reset({
            title: "Sua conta foi criada com sucesso!",
            description: "Agora é só fazer login na nossa plataforma",
            iconProps: {
                name: "checkRound",
                color: "greenSuccess",
            },
        });
    }

    return (
        <Screen canGoBack scrollable>
            <Text preset={"headingLarge"} mb={"s32"}>
                Criar uma conta
            </Text>

            <Controller
                control={control}
                name={"username"}
                rules={{ required: "Username obrigatório" }}
                render={({ field, fieldState }) => (
                    <TextInput
                        value={field.value}
                        onChangeText={field.onChange}
                        errorMessage={fieldState.error?.message}
                        label={"Seu username"}
                        placeholder={"@"}
                        boxProps={{ mb: "s20" }}
                    />
                )}
            />

            <Controller
                control={control}
                name={"fullName"}
                rules={{ required: "Nome completo obrigatório" }}
                render={({ field, fieldState }) => (
                    <TextInput
                        value={field.value}
                        onChangeText={field.onChange}
                        errorMessage={fieldState.error?.message}
                        label={"Nome completo"}
                        placeholder={"Digite seu nome completo"}
                        boxProps={{ mb: "s20" }}
                    />
                )}
            />

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
                        boxProps={{ mb: "s48" }}
                    />
                )}
            />

            <Button
                disabled={!formState.isValid}
                title={"Criar uma conta"}
                preset={"primary"}
                onPress={handleSubmit(submitForm)}
            />
        </Screen>
    );
}
