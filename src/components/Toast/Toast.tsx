import React, { useEffect } from "react";
import { Dimensions } from "react-native";

import { useToast } from "@services";

import { Box, BoxProps, Icon, Text } from "@components";
import { useAppSafeArea } from "@hooks";
import { $shadowProps } from "@theme";

const MAX_WIDTH = Dimensions.get("screen").width * 0.9;

export function Toast() {
  const { toast, hideToast } = useToast();
  const { bottom } = useAppSafeArea();

  useEffect(() => {
    setTimeout(() => {
      hideToast();
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);

  if (!toast) {
    return null;
  }

  return (
    <Box bottom={bottom} {...$wrapper}>
      <Icon name={"checkRound"} color={"success"} size={32} />

      <Text
        preset={"paragraphMedium"}
        weight={"bold"}
        ml={"s16"}
        style={{ flexShrink: 1 }}
      >
        {toast?.message}
      </Text>
    </Box>
  );
}

const $wrapper: BoxProps = {
  position: "absolute",
  alignSelf: "center",
  maxWidth: MAX_WIDTH,

  flexDirection: "row",
  alignItems: "center",
  padding: "s16",
  borderRadius: "s16",

  backgroundColor: "background",
  opacity: 0.95,
  style: { ...$shadowProps },
};
