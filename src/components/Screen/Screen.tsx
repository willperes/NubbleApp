import React from "react";
import { Box } from "../Box/Box";
import { useAppSafeArea } from "../../hooks/useAppSafeArea";
import { Icon } from "../Icon/Icon";
import { Text } from "../Text/Text";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import {
    ScrollViewContainer,
    ViewContainer,
} from "./components/ScreenContainer";
import { useAppTheme } from "../../hooks/useAppTheme";

interface ScreenProps {
    children: React.ReactElement | React.ReactElement[];
    scrollable?: boolean;
    canGoBack?: boolean;
}

export function Screen({
    children,
    scrollable,
    canGoBack = false,
}: ScreenProps) {
    const { top, bottom } = useAppSafeArea();
    const { colors } = useAppTheme();

    const Container = scrollable ? ScrollViewContainer : ViewContainer;
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flexGrow: 1 }}
        >
            <Container backgroundColor={colors.background}>
                <Box
                    paddingHorizontal={"s24"}
                    style={{
                        paddingTop: top,
                        paddingBottom: bottom,
                    }}
                >
                    {canGoBack ? (
                        <Box
                            mb={"s24"}
                            flexDirection={"row"}
                            alignItems={"center"}
                        >
                            <Icon name={"arrowLeft"} color={"primary"} />
                            <Text
                                preset={"paragraphMedium"}
                                weight={"semiBold"}
                                ml={"s8"}
                            >
                                Voltar
                            </Text>
                        </Box>
                    ) : null}
                    {children}
                </Box>
            </Container>
        </KeyboardAvoidingView>
    );
}
