import React from "react";

import { SimpleLogo } from "@brand";
import { useNavigation } from "@react-navigation/native";

import { Box, BoxProps, Icon } from "@components";
import { useAppSafeArea } from "@hooks";
export function HomeHeader() {
  const { top } = useAppSafeArea();
  const navigation = useNavigation();

  function navigateToSearchScreen() {
    navigation.navigate("SearchScreen");
  }

  return (
    <Box {...$wrapper} style={{ paddingTop: top }}>
      <Box>
        <SimpleLogo width={70} />
      </Box>
      <Box flexDirection={"row"} alignItems={"center"} gap={"s24"}>
        <Icon name={"search"} onPress={navigateToSearchScreen} />
        <Icon name={"bell"} />
        <Icon name={"chat"} />
      </Box>
    </Box>
  );
}

const $wrapper: BoxProps = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: "s24",
  paddingBottom: "s24",
};
