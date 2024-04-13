import React from "react";
import { SafeAreaView } from "react-native";
import { Text } from "./src/components/Text/Text";
import { ThemeProvider } from "@shopify/restyle";
import { theme } from "./src/theme/theme";
import { Box } from "./src/components/Box/Box";
import { Button } from "./src/components/Button/Button";
import { TextInput } from "./src/components/TextInput/TextInput";
import { Icon } from "./src/components/Icon/Icon";

function App(): React.JSX.Element {
    return (
        <ThemeProvider theme={theme}>
            <SafeAreaView style={{ flex: 1 }}>
                <Box paddingHorizontal={"s24"}>
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

                    <TextInput
                        label={"Senha"}
                        placeholder={"Digite sua senha"}
                        errorMessage={"Ocorreu um erro"}
                        TrailingComponent={
                            <Icon color={"gray2"} name={"eyeOn"} />
                        }
                        boxProps={{ mb: "s10" }}
                    />

                    <Text
                        preset={"paragraphSmall"}
                        weight={"bold"}
                        color={"primary"}
                    >
                        Esqueci minha senha
                    </Text>

                    <Button preset={"primary"} title={"Entrar"} mt={"s48"} />
                    <Button
                        preset={"outline"}
                        title={"Criar uma conta"}
                        mt={"s12"}
                    />
                </Box>
            </SafeAreaView>
        </ThemeProvider>
    );
}

export default App;
