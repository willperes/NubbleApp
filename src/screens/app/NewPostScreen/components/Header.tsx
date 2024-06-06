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

  function navigateToCamera() {
    navigation.navigate("CameraScreen");
  }

  return (
    <Box>
      <Box height={imageWidth} width={imageWidth}>
        {imageUri && (
          <ImageBackground
            source={{ uri: imageUri }}
            style={[
              {
                flex: 1,
              },
              $imageBackgroundStyles,
            ]}
          >
            <Button
              preset={"ghost"}
              title={"Escolher essa"}
              mb="s24"
              onPress={navigateToPublishPostScreen}
            />
          </ImageBackground>
        )}
      </Box>
      <Box {...$galleryBoxStyles}>
        <Text preset={"headingSmall"} weight={"bold"}>
          Sua galeria
        </Text>
        <Icon name={"camera"} onPress={navigateToCamera} />
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
