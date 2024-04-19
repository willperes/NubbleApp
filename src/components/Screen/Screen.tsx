import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { useAppSafeArea, useAppTheme } from "@hooks";

import { Box, TouchableOpacityBox } from "../Box/Box";
import { Icon } from "../Icon/Icon";
import { Text } from "../Text/Text";

import {
  ScrollViewContainer,
  ViewContainer,
} from "./components/ScreenContainer";

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
  const navigation = useNavigation();

  const Container = scrollable ? ScrollViewContainer : ViewContainer;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
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
            <TouchableOpacityBox
              mb={"s24"}
              flexDirection={"row"}
              alignItems={"center"}
              onPress={navigation.goBack}
            >
              <Icon name={"arrowLeft"} color={"primary"} />
              <Text preset={"paragraphMedium"} weight={"semiBold"} ml={"s8"}>
                Voltar
              </Text>
            </TouchableOpacityBox>
          ) : null}
          {children}
        </Box>
      </Container>
    </KeyboardAvoidingView>
  );
}
