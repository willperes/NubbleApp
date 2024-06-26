import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

import { Box, BoxProps } from "@components";
import { useAppSafeArea, useAppTheme } from "@hooks";

import { ScreenHeader, ScrollViewContainer, ViewContainer } from "./components";

export interface ScreenProps extends BoxProps {
  HeaderComponent?: React.ReactNode;
  scrollable?: boolean;
  canGoBack?: boolean;
  title?: string;
  noHorizontalPadding?: boolean;
}

export function Screen({
  children,
  HeaderComponent,
  scrollable,
  canGoBack = false,
  title,
  style,
  noHorizontalPadding = false,
  ...boxProps
}: React.PropsWithChildren<ScreenProps>) {
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
          paddingHorizontal={noHorizontalPadding ? undefined : "s24"}
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
              paddingHorizontal={noHorizontalPadding ? "s24" : undefined}
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
