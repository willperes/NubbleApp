import React from "react";

import { Icon, PressableBox, PressableBoxProps, Text } from "@components";

export type MenuItemProps = {
  label: string;
  onPress: () => void;
};

export function MenuItem({ label, onPress }: MenuItemProps) {
  return (
    <PressableBox {...$boxStyle} onPress={onPress}>
      <Text weight={"semiBold"}>{label}</Text>
      <Icon name={"chevronRight"} />
    </PressableBox>
  );
}

const $boxStyle: PressableBoxProps = {
  paddingVertical: "s16",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
};
