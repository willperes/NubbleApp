import { ComponentProps } from "react";
import {
  Pressable,
  PressableProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import {
  BackgroundColorProps,
  BorderProps,
  LayoutProps,
  SpacingProps,
  SpacingShorthandProps,
  backgroundColor,
  border,
  createBox,
  createRestyleComponent,
  layout,
  spacing,
  spacingShorthand,
} from "@shopify/restyle";

import { Theme } from "@theme";

export const Box = createBox<Theme>();
export type BoxProps = ComponentProps<typeof Box>;

type RestyleTypes = BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> &
  SpacingProps<Theme> &
  SpacingShorthandProps<Theme>;

export type TouchableOpacityBoxProps = TouchableOpacityProps & RestyleTypes;
export const TouchableOpacityBox = createRestyleComponent<
  TouchableOpacityBoxProps,
  Theme
>(
  [backgroundColor, spacing, spacingShorthand, layout, border],
  TouchableOpacity,
);

export type PressableBoxProps = PressableProps & RestyleTypes;
export const PressableBox = createRestyleComponent<PressableBoxProps, Theme>(
  [backgroundColor, spacing, spacingShorthand, layout, border],
  Pressable,
);
