import React, { useState } from "react";

import { Icon } from "../Icon/Icon";
import { TextInput, TextInputProps } from "../TextInput/TextInput";

export type PasswordInputProps = Omit<TextInputProps, "TrailingComponent">;

export function PasswordInput({ ...textInputProps }: PasswordInputProps) {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

  function toggleSecureTextEntry(): void {
    setIsSecureTextEntry(prev => !prev);
  }

  return (
    <TextInput
      {...textInputProps}
      secureTextEntry={isSecureTextEntry}
      TrailingComponent={
        <Icon
          onPress={toggleSecureTextEntry}
          color={"gray2"}
          name={isSecureTextEntry ? "eyeOn" : "eyeOff"}
        />
      }
    />
  );
}
