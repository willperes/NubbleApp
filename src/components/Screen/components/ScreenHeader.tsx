import React from "react";

import { useNavigation } from "@react-navigation/native";

import { Box, Icon, ScreenProps, Text, TouchableOpacityBox } from "@components";

const ICON_SIZE = 20;

type ScreenHeaderProps = Pick<ScreenProps, "canGoBack" | "title">;

export function ScreenHeader({ canGoBack, title }: ScreenHeaderProps) {
  const navigation = useNavigation();

  return (
    <Box
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      mb={"s24"}
    >
      {canGoBack ? (
        <TouchableOpacityBox
          flexDirection={"row"}
          alignItems={"center"}
          onPress={navigation.goBack}
        >
          <Icon size={ICON_SIZE} name={"arrowLeft"} color={"primary"} />
          {!title && (
            <Text preset={"paragraphMedium"} weight={"semiBold"} ml={"s8"}>
              Voltar
            </Text>
          )}
        </TouchableOpacityBox>
      ) : (
        <HeaderSpacingComponent />
      )}
      {title && <Text preset={"headingSmall"}>{title}</Text>}
      {title && <HeaderSpacingComponent />}
    </Box>
  );
}

const HeaderSpacingComponent = () => (
  <Box height={ICON_SIZE} width={ICON_SIZE} />
);
