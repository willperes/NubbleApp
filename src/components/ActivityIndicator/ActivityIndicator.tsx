import React from "react";
import {
  ActivityIndicator as RNActivityIndicator,
  ActivityIndicatorProps as RNActivityIndicatorProps,
} from "react-native";
import { Theme, ThemeColor } from "../../theme/theme";
import { useTheme } from "@shopify/restyle";

interface ActivityIndicatorProps
  extends Omit<RNActivityIndicatorProps, "color"> {
  color: ThemeColor;
}

export const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({
  color,
  ...rNActivityIndicatorProps
}) => {
  const { colors } = useTheme<Theme>();

  return (
    <RNActivityIndicator color={colors[color]} {...rNActivityIndicatorProps} />
  );
};
