import React from "react";
import { Screen } from "../../../components/Screen/Screen";
import { Text } from "../../../components/Text/Text";
import { TextInput } from "../../../components/TextInput/TextInput";
import { Button } from "../../../components/Button/Button";
import { useResetNavigationSuccess } from "../../../hooks/useResetNavigationSuccess";

export function ForgotPasswordScreen() {
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

            <TextInput
                boxProps={{ mt: "s32" }}
                label={"E-mail"}
                placeholder={"Digite seu e-mail"}
            />

            <Button mt={"s48"} title={"Recuperar senha"} onPress={submitForm} />
        </Screen>
    );
}
