import React from "react";

import { Box, Text } from "@components";

import { OnboardingPageItem } from "../onboardingData";

type ContentProps = Pick<OnboardingPageItem, "title" | "subtitle">;

export function Content({ title, subtitle }: ContentProps) {
  return (
    <Box>
      <Text>
        {title.map(titleElement => (
          <Text
            key={titleElement.text}
            preset={"headingLarge"}
            color={titleElement.highlighted ? "carrotSecondary" : undefined}
          >
            {titleElement.text}
          </Text>
        ))}
      </Text>
      <Text preset={"paragraphLarge"} mt={"s16"}>
        {subtitle}
      </Text>
    </Box>
  );
}
