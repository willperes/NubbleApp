import React from "react";

import { SimpleLogo } from "@brand";

import { Box, BoxProps, Icon } from "@components";
import { useAppSafeArea } from "@hooks";
export function HomeHeader() {
  const { top } = useAppSafeArea();

  return (
    <Box {...$wrapper} style={{ paddingTop: top }}>
      <Box>
        <SimpleLogo width={70} />
      </Box>
      <Box flexDirection={"row"} alignItems={"center"} gap={"s24"}>
        <Icon name={"search"} />
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
