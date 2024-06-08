import React from "react";

import { Box } from "../Box/Box";
import { Separator } from "../Separator/Separator";

import { RadioButtonItem } from "./RadioButtonItem";

type Item = {
  label: string;
  description?: string;
};
export type RadioButtonSelectorProps = {
  items: Item[];
};

export function RadioButtonSelector({ items }: RadioButtonSelectorProps) {
  return (
    <Box>
      {items.map((item, index) => (
        <Box key={item.label}>
          <RadioButtonItem isSelected={false} onPress={() => {}} {...item} />
          {index < items.length - 1 && <Separator />}
        </Box>
      ))}
    </Box>
  );
}
