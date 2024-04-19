import { useAppTheme } from "@hooks";
import { ThemeColor } from "@theme";
import React from "react";
import {
    ActivityIndicator as RNActivityIndicator,
    ActivityIndicatorProps as RNActivityIndicatorProps,
} from "react-native";

interface ActivityIndicatorProps
    extends Omit<RNActivityIndicatorProps, "color"> {
    color: ThemeColor;
}

export function ActivityIndicator({
    color,
    ...rnActivityIndicatorProps
}: ActivityIndicatorProps) {
    const { colors } = useAppTheme();

    return (
        <RNActivityIndicator
            color={colors[color]}
            {...rnActivityIndicatorProps}
        />
    );
}
