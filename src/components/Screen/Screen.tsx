import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

import { Box, BoxProps } from "@components";
import { useAppSafeArea, useAppTheme } from "@hooks";

import { ScreenHeader, ScrollViewContainer, ViewContainer } from "./components";

export interface ScreenProps extends BoxProps {
  children: React.ReactElement | React.ReactElement[];
  HeaderComponent?: React.ReactNode;
  scrollable?: boolean;
  canGoBack?: boolean;
  title?: string;
}

export function Screen({
  children,
  HeaderComponent,
  scrollable,
  canGoBack = false,
  title,
  style,
  ...boxProps
}: ScreenProps) {
  const { top, bottom } = useAppSafeArea();
  const { colors } = useAppTheme();

  const Container = scrollable ? ScrollViewContainer : ViewContainer;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <Container backgroundColor={colors.background}>
        <Box
          paddingHorizontal={"s24"}
          style={[
            {
              paddingTop: top,
              paddingBottom: bottom,
            },
            style,
          ]}
          {...boxProps}
        >
          {title || canGoBack ? (
            <ScreenHeader
              canGoBack={canGoBack}
              title={title}
              HeaderComponent={HeaderComponent}
            />
          ) : null}
          {children}
        </Box>
      </Container>
    </KeyboardAvoidingView>
  );
}
