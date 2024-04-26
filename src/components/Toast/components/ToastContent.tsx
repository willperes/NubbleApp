import React from "react";
import { Dimensions } from "react-native";

import { Toast } from "@services";

import { Box, BoxProps, Icon, IconProps, Text } from "@components";
import { $shadowProps } from "@theme";

const MAX_WIDTH = Dimensions.get("screen").width * 0.9;

interface ToastContentProps {
  toast: Toast;
}

export function ToastContent({ toast }: ToastContentProps) {
  const type: Toast.Type = toast?.type || "success";

  return (
    <Box {...$wrapper} style={[$shadowProps]}>
      <Icon {...mapTypeToIcon[type]} size={32} />

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

const mapTypeToIcon: Record<Toast.Type, IconProps> = {
  success: {
    color: "success",
    name: "checkRound",
  },
  error: {
    color: "error",
    name: "errorRound",
  },
};

const $wrapper: BoxProps = {
  maxWidth: MAX_WIDTH,

  flexDirection: "row",
  alignItems: "center",
  padding: "s16",
  borderRadius: "s16",

  backgroundColor: "background",
  opacity: 0.95,
  style: { ...$shadowProps },
};
