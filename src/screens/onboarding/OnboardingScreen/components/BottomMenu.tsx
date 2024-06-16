import React from "react";

import { Box, Icon, PressableBox, Text } from "@components";

import { OnboardingPageProps } from "./OnboardingPage";

type BottomMenuProps = {
  isLast: boolean;
} & Pick<OnboardingPageProps, "onPressNext" | "onPressSkip">;

export function BottomMenu({
  isLast,
  onPressNext,
  onPressSkip,
}: BottomMenuProps) {
  return (
    <Box flexDirection={"row"} justifyContent={"space-between"}>
      <PressableBox hitSlop={10} onPress={onPressSkip}>
        <Text color={"gray2"} weight={"semiBold"}>
          Pular
        </Text>
      </PressableBox>

      <PressableBox
        hitSlop={10}
        flexDirection={"row"}
        alignItems={"center"}
        onPress={onPressNext}
      >
        <Text mr={"s4"} weight={"bold"}>
          {isLast ? "Começar" : "Próximo"}
        </Text>
        <Icon name={"arrowRight"} color={"carrotSecondary"} />
      </PressableBox>
    </Box>
  );
}
