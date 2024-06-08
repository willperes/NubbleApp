import React from "react";

import { useNavigation } from "@react-navigation/native";

import {
  Box,
  BoxProps,
  Icon,
  ScreenProps,
  Text,
  TouchableOpacityBox,
} from "@components";

const ICON_SIZE = 20;

type ScreenHeaderProps = Pick<
  ScreenProps,
  "canGoBack" | "title" | "HeaderComponent"
> &
  BoxProps;

export function ScreenHeader({
  canGoBack,
  title,
  HeaderComponent,
  ...boxProps
}: ScreenHeaderProps) {
  const navigation = useNavigation();

  if (!canGoBack && !title && !HeaderComponent) {
    return null;
  }

  const showBackLabel = !title && !HeaderComponent;

  return (
    <Box
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      mb={"s24"}
      {...boxProps}
    >
      {canGoBack ? (
        <TouchableOpacityBox
          flexDirection={"row"}
          alignItems={"center"}
          mr={showBackLabel ? "s10" : undefined}
          onPress={navigation.goBack}
        >
          <Icon size={ICON_SIZE} name={"arrowLeft"} color={"primary"} />
          {showBackLabel && (
            <Text preset={"paragraphMedium"} weight={"semiBold"} ml={"s8"}>
              Voltar
            </Text>
          )}
        </TouchableOpacityBox>
      ) : (
        <HeaderSpacingComponent />
      )}
      {HeaderComponent}
      {title && <Text preset={"headingSmall"}>{title}</Text>}
      {title && <HeaderSpacingComponent />}
    </Box>
  );
}

const HeaderSpacingComponent = () => (
  <Box height={ICON_SIZE} width={ICON_SIZE} />
);
