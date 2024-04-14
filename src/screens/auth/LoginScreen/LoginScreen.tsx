import React from "react";
import { Text } from "../../../components/Text/Text";
import { TextInput } from "../../../components/TextInput/TextInput";
import { Button } from "../../../components/Button/Button";
import { Screen } from "../../../components/Screen/Screen";
import { PasswordInput } from "../../../components/PasswordInput/PasswordInput";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../../../routes/Routes";

type ScreenProps = NativeStackScreenProps<RootStackParamList, "LoginScreen">;

export function LoginScreen({ navigation }: ScreenProps) {
    function navigateToSignUpScreen(): void {
        navigation.navigate("SignUpScreen");
    }

    return (
        <Screen scrollable>
            <Text preset={"headingLarge"} mb={"s8"}>
                Olá!
            </Text>
            <Text preset={"paragraphLarge"} mb={"s40"}>
                Digite seu e-mail e senha para entrar
            </Text>

            <TextInput
                label={"E-mail"}
                placeholder={"Digite seu e-mail"}
                boxProps={{ mb: "s20" }}
            />

            <PasswordInput
                label={"Senha"}
                placeholder={"Digite sua senha"}
                boxProps={{ mb: "s10" }}
            />

            <Text preset={"paragraphSmall"} weight={"bold"} color={"primary"}>
                Esqueci minha senha
            </Text>

            <Button preset={"primary"} title={"Entrar"} mt={"s48"} />
            <Button
                preset={"outline"}
                title={"Criar uma conta"}
                mt={"s12"}
                onPress={navigateToSignUpScreen}
            />
        </Screen>
    );
}
