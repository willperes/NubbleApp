import React, { useRef } from "react";
import {
    Pressable,
    TextInput as RNTextInput,
    TextInputProps as RNTextInputProps,
    TextStyle,
} from "react-native";
import { $fontFamily, $fontSizes, Text } from "../Text/Text";
import { Box, BoxProps } from "../Box/Box";
import { useAppTheme } from "../../hooks/useAppTheme";

export interface TextInputProps extends RNTextInputProps {
    label: string;
    errorMessage?: string;
    TrailingComponent?: React.ReactElement;
    boxProps?: BoxProps;
}

export function TextInput({
    label,
    errorMessage,
    TrailingComponent,
    boxProps,
    ...rnTextInputProps
}: TextInputProps) {
    const { colors } = useAppTheme();
    const inputRef = useRef<RNTextInput>(null);

    const $textInputContainer: BoxProps = {
        borderWidth: errorMessage ? 2 : 1,
        borderColor: errorMessage ? "error" : "gray4",
        borderRadius: "s12",
        padding: "s16",
    };

    function focusInput(): void {
        inputRef.current?.focus();
    }

    return (
        <Box {...boxProps}>
            <Pressable onPress={focusInput}>
                <Text preset={"paragraphMedium"} mb={"s4"}>
                    {label}
                </Text>
                <Box
                    flexDirection={"row"}
                    alignItems={"center"}
                    {...$textInputContainer}
                >
                    <RNTextInput
                        ref={inputRef}
                        placeholderTextColor={colors.gray2}
                        style={$textInput}
                        {...rnTextInputProps}
                    />
                    {TrailingComponent && (
                        <Box ml={"s16"}>{TrailingComponent}</Box>
                    )}
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

const $textInput: TextStyle = {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    fontFamily: $fontFamily.regular.normal,
    ...$fontSizes.paragraphMedium,
};
