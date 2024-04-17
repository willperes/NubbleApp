import React from "react";
import { Screen } from "../../../components/Screen/Screen";
import { Text } from "../../../components/Text/Text";
import { Button } from "../../../components/Button/Button";
import { useResetNavigationSuccess } from "../../../hooks/useResetNavigationSuccess";
import { useForm } from "react-hook-form";
import { FormTextInput } from "../../../components/Form/FormTextInput/FormTextInput";
import { signUpSchema, SignUpSchema } from "./signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormPasswordInput } from "../../../components/Form/FormTextInput/FormPasswordInput";

export function SignUpScreen() {
    const { control, formState, handleSubmit } = useForm<SignUpSchema>({
        mode: "onChange",
        resolver: zodResolver(signUpSchema),
    });

    const { reset } = useResetNavigationSuccess();

    function submitForm(formValues: SignUpSchema): void {
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

            <FormTextInput
                control={control}
                name={"username"}
                label={"Seu username"}
                placeholder={"@"}
                boxProps={{ mb: "s20" }}
            />

            <FormTextInput
                control={control}
                name={"fullName"}
                label={"Nome completo"}
                placeholder={"Digite seu nome completo"}
                boxProps={{ mb: "s20" }}
            />

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
                boxProps={{ mb: "s48" }}
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
