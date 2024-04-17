import React from "react";
import { Screen } from "../../../components/Screen/Screen";
import { Text } from "../../../components/Text/Text";
import { Button } from "../../../components/Button/Button";
import { useResetNavigationSuccess } from "../../../hooks/useResetNavigationSuccess";
import { FormTextInput } from "../../../components/Form/FormTextInput/FormTextInput";
import { useForm } from "react-hook-form";
import {
    ForgotPasswordSchema,
    forgotPasswordSchema,
} from "./forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export function ForgotPasswordScreen() {
    const { control, formState, handleSubmit } = useForm<ForgotPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema),
        mode: "onChange",
    });

    const { reset } = useResetNavigationSuccess();

    function submitForm(): void {
        reset({
            title: "Enviamos as instruções para seu e-mail",
            description:
                "Clique no link enviado no seu e-mail para recuperar sua senha",
            iconProps: {
                name: "messageRound",
                color: "greenPrimary",
            },
        });
    }

    return (
        <Screen canGoBack>
            <Text preset={"headingLarge"} weight={"bold"}>
                Esqueci minha senha
            </Text>

            <Text preset={"paragraphLarge"} mt={"s16"}>
                Digite seu e-mail e enviaremos as instruções para redefinição de
                senha
            </Text>

            <FormTextInput
                control={control}
                name={"email"}
                boxProps={{ mt: "s32" }}
                label={"E-mail"}
                placeholder={"Digite seu e-mail"}
            />

            <Button
                disabled={!formState.isValid}
                mt={"s48"}
                title={"Recuperar senha"}
                onPress={handleSubmit(submitForm)}
            />
        </Screen>
    );
}
