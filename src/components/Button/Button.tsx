import React from "react";
import { Text } from "../Text/Text";
import { TouchableOpacityBox, TouchableOpacityBoxProps } from "../Box/Box";
import { ButtonPreset, buttonPresets } from "./buttonPresets";
import { ActivityIndicator } from "../ActivityIndicator/ActivityIndicator";

interface ButtonProps extends TouchableOpacityBoxProps {
    title: string;
    loading?: boolean;
    disabled?: boolean;
    preset?: ButtonPreset;
}

export function Button({
    title,
    loading = false,
    disabled = false,
    preset = "primary",
    ...touchableOpacityBoxProps
}: ButtonProps) {
    const buttonPreset =
        buttonPresets[preset][disabled ? "disabled" : "default"];

    return (
        <TouchableOpacityBox
            disabled={disabled || loading}
            height={50}
            alignItems={"center"}
            justifyContent={"center"}
            paddingHorizontal={"s20"}
            borderRadius={"s16"}
            {...buttonPreset.container}
            {...touchableOpacityBoxProps}
        >
            {loading ? (
                <ActivityIndicator color={buttonPreset.content} />
            ) : (
                <Text
                    preset={"paragraphMedium"}
                    weight={"bold"}
                    color={buttonPreset.content}
                >
                    {title}
                </Text>
            )}
        </TouchableOpacityBox>
    );
}
