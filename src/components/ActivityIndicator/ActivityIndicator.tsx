import React from "react";
import {
  ActivityIndicator as RNActivityIndicator,
  ActivityIndicatorProps as RNActivityIndicatorProps,
} from "react-native";

import { useAppTheme } from "@hooks";
import { ThemeColor } from "@theme";

interface ActivityIndicatorProps
  extends Omit<RNActivityIndicatorProps, "color"> {
  color?: ThemeColor;
}

export function ActivityIndicator({
  color = "primary",
  ...rnActivityIndicatorProps
}: ActivityIndicatorProps) {
  const { colors } = useAppTheme();

  return (
    <RNActivityIndicator color={colors[color]} {...rnActivityIndicatorProps} />
  );
}
