import React from "react";
import { ImageBackground, ImageStyle } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Box, BoxProps, Button, Icon, Text } from "@components";

interface Props {
  imageUri: string | undefined;
  imageWidth: number;
}

export function Header({ imageUri, imageWidth }: Props) {
  const navigation = useNavigation();

  function navigateToPublishPostScreen() {
    if (!imageUri) {
      return;
    }

    navigation.navigate("PublishPostScreen", { imageUri });
  }

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
        {imageUri && (
          <Button
            preset={"ghost"}
            title={"Escolher essa"}
            mb="s24"
            onPress={navigateToPublishPostScreen}
          />
        )}
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
