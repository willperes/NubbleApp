import React from "react";
import { ImageBackground, ImageStyle } from "react-native";

import { Box, BoxProps, Button, Icon, Text } from "@components";

interface Props {
  imageUri: string;
  imageWidth: number;
}

export function Header({ imageUri, imageWidth }: Props) {
  return (
    <Box>
      <ImageBackground
        source={{ uri: imageUri }}
        style={[
          {
            height: imageWidth,
            width: imageWidth,
          },
          $imageBackgroundStyles,
        ]}
      >
        <Button title={"Escolher essa"} mb="s24" />
      </ImageBackground>
      <Box {...$galleryBoxStyles}>
        <Text preset={"headingSmall"} weight={"bold"}>
          Sua galeria
        </Text>
        <Icon name={"camera"} />
      </Box>
    </Box>
  );
}

const $imageBackgroundStyles: ImageStyle = {
  justifyContent: "flex-end",
  alignItems: "center",
};

const $galleryBoxStyles: BoxProps = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: "s24",
  paddingVertical: "s16",
};
