import React from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { Text } from "../Text/Text";
import { TouchableOpacityBox, TouchableOpacityBoxProps } from "../Box/Box";

interface ButtonProps extends TouchableOpacityBoxProps {
  title: string;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  loading = false,
  ...touchableOpacityBoxProps
}) => {
  return (
    <TouchableOpacityBox
      height={50}
      alignItems={"center"}
      justifyContent={"center"}
      paddingHorizontal={"s20"}
      backgroundColor={"carrotSecondary"}
      borderRadius={"s16"}
      {...touchableOpacityBoxProps}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text
          preset={"paragraphMedium"}
          weight={"bold"}
          color={"primaryContrast"}
        >
          {title}
        </Text>
      )}
    </TouchableOpacityBox>
  );
};
