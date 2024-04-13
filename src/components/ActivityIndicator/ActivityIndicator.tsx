import React from "react";
import {
    ActivityIndicator as RNActivityIndicator,
    ActivityIndicatorProps as RNActivityIndicatorProps,
} from "react-native";
import { ThemeColor } from "../../theme/theme";
import { useAppTheme } from "../../hooks/useAppTheme";

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
