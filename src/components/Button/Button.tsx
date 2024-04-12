import React from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { Text } from "../Text/Text";
import { TouchableOpacityBox, TouchableOpacityBoxProps } from "../Box/Box";
import { ButtonPreset, buttonPresets } from "./buttonPresets";

interface ButtonProps extends TouchableOpacityBoxProps {
  title: string;
  loading?: boolean;
  preset?: ButtonPreset;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  loading = false,
  preset = "primary",
  ...touchableOpacityBoxProps
}) => {
  const buttonPreset = buttonPresets[preset];

  return (
    <TouchableOpacityBox
      height={50}
      alignItems={"center"}
      justifyContent={"center"}
      paddingHorizontal={"s20"}
      borderRadius={"s16"}
      {...buttonPreset.container}
      {...touchableOpacityBoxProps}
    >
      {loading ? (
        <ActivityIndicator />
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
};
