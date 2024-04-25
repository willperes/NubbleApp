import React, { useRef } from "react";
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";

import { $textInput, Box, Text } from "@components";
import { useAppTheme } from "@hooks";

interface TextMessageProps extends RNTextInputProps {
  onPressSend: (message: string) => void;
}

export function TextMessage({
  onPressSend,
  value,
  ...rnTextInputProps
}: TextMessageProps) {
  const { colors } = useAppTheme();
  const inputRef = useRef<RNTextInput>(null);

  function focusInput() {
    inputRef.current?.focus();
  }

  const isSendDisabled = value?.trim().length === 0;

  return (
    <Pressable onPressIn={focusInput}>
      <Box
        paddingHorizontal={"s16"}
        paddingVertical={"s14"}
        backgroundColor={"gray5"}
        borderRadius={"s12"}
        flexDirection={"row"}
        alignItems={"center"}
      >
        <RNTextInput
          ref={inputRef}
          value={value}
          autoCapitalize={"none"}
          placeholderTextColor={colors.gray1}
          style={[$textInput, { color: colors.gray1 }]}
          {...rnTextInputProps}
        />
        <Pressable
          disabled={isSendDisabled}
          onPress={() => onPressSend(value ?? "")}
        >
          <Text color={isSendDisabled ? "gray2" : "primary"} weight={"bold"}>
            Enviar
          </Text>
        </Pressable>
      </Box>
    </Pressable>
  );
}
