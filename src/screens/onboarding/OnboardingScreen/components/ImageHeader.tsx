import React from "react";
import { Dimensions, Image } from "react-native";

import { useAppColorScheme } from "@services";

import { OnboardingPageItem } from "../onboardingData";

const SCREEN_WIDTH = Dimensions.get("screen").width;

type ImageHeader = {
  image: OnboardingPageItem["image"];
};

export function ImageHeader({ image }: ImageHeader) {
  const appColorScheme = useAppColorScheme();

  return (
    <Image
      source={appColorScheme === "dark" ? image.dark : image.light}
      style={{ width: SCREEN_WIDTH, height: "100%" }}
    />
  );
}
