import React from "react";

import { Box } from "../Box/Box";
import { Text } from "../Text/Text";

import { RadioButton, RadioButtonProps } from "./RadioButton";

export type RadioButtonItemProps = RadioButtonProps & {
  label: string;
  description?: string;
};

export function RadioButtonItem({
  label,
  description,
  ...radioButtonProps
}: RadioButtonItemProps) {
  return (
    <Box flexDirection={"row"} paddingVertical={"s16"}>
      <Box flexGrow={1} flexShrink={1} mr={"s10"}>
        <Text weight={"semiBold"}>{label}</Text>
        {description && <Text color={"paragraphSecondary"}>{description}</Text>}
      </Box>
      <RadioButton {...radioButtonProps} />
    </Box>
  );
}
