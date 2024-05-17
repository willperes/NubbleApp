import React from "react";

import { ActivityIndicator } from "../ActivityIndicator/ActivityIndicator";
import { TouchableOpacityBox, TouchableOpacityBoxProps } from "../Box/Box";
import { Text } from "../Text/Text";

import { ButtonPreset, buttonPresets } from "./buttonPresets";

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
  const buttonPreset = buttonPresets[preset][disabled ? "disabled" : "default"];

  return (
    <TouchableOpacityBox
      testID={"button"}
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
        <ActivityIndicator
          testID={"loading-activity-indicator"}
          color={buttonPreset.content.color}
        />
      ) : (
        <Text
          preset={"paragraphMedium"}
          weight={"bold"}
          color={buttonPreset.content.color}
          {...buttonPreset.content.textProps}
        >
          {title}
        </Text>
      )}
    </TouchableOpacityBox>
  );
}
