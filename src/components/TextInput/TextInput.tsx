import React, { useRef } from "react";
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
} from "react-native";

import { useAppTheme } from "@hooks";

import { Box, BoxProps } from "../Box/Box";
import { $fontFamily, $fontSizes, Text } from "../Text/Text";

export interface TextInputProps extends RNTextInputProps {
  label?: string;
  errorMessage?: string;
  LeadingComponent?: React.ReactElement;
  TrailingComponent?: React.ReactElement;
  boxProps?: BoxProps;
  containerProps?: BoxProps;
}

export function TextInput({
  label,
  errorMessage,
  LeadingComponent,
  TrailingComponent,
  boxProps,
  containerProps,
  ...rnTextInputProps
}: TextInputProps) {
  const { colors } = useAppTheme();
  const inputRef = useRef<RNTextInput>(null);

  const $textInputContainer: BoxProps = {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: errorMessage ? 2 : 1,
    borderColor: errorMessage ? "error" : "gray4",
    borderRadius: "s12",
    padding: "s16",
  };

  function focusInput(): void {
    inputRef.current?.focus();
  }

  return (
    <Box flexGrow={1} flexShrink={1} {...boxProps}>
      <Pressable onPress={focusInput}>
        {label && (
          <Text preset={"paragraphMedium"} mb={"s4"}>
            {label}
          </Text>
        )}
        <Box {...$textInputContainer} {...containerProps}>
          {LeadingComponent && <Box mr={"s16"}>{LeadingComponent}</Box>}
          <RNTextInput
            autoCapitalize={"none"}
            ref={inputRef}
            placeholderTextColor={colors.gray2}
            style={$textInput}
            {...rnTextInputProps}
          />
          {TrailingComponent && <Box ml={"s16"}>{TrailingComponent}</Box>}
        </Box>
        {errorMessage ? (
          <Text
            color={"error"}
            preset={"paragraphSmall"}
            weight={"bold"}
            mt={"s4"}
          >
            {errorMessage}
          </Text>
        ) : null}
      </Pressable>
    </Box>
  );
}

export const $textInput: TextStyle = {
  padding: 0,
  flexGrow: 1,
  flexShrink: 1,
  fontFamily: $fontFamily.regular.normal,
  ...$fontSizes.paragraphMedium,
};
