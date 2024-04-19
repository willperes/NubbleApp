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
import { ComponentProps } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

export const Box = createBox<Theme>();
export type BoxProps = ComponentProps<typeof Box>;

export type TouchableOpacityBoxProps = TouchableOpacityProps &
    BackgroundColorProps<Theme> &
    BorderProps<Theme> &
    LayoutProps<Theme> &
    SpacingProps<Theme> &
    SpacingShorthandProps<Theme>;
export const TouchableOpacityBox = createRestyleComponent<
    TouchableOpacityBoxProps,
    Theme
>(
    [backgroundColor, spacing, spacingShorthand, layout, border],
    TouchableOpacity,
);
