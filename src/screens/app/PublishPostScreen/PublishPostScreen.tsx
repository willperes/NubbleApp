import React, { useState } from "react";
import { Dimensions, Image } from "react-native";

import { Box, Button, Screen, Text, TextInput } from "@components";
import { AppScreenProps } from "@routes";

const IMAGE_WIDTH = Dimensions.get("screen").width / 2;

export function PublishPostScreen({
  route,
}: AppScreenProps<"PublishPostScreen">) {
  const { imageUri } = route.params;

  const [description, setDescription] = useState("");

  return (
    <Screen canGoBack title={"Novo post"}>
      <Box mt={"s20"}>
        <Image
          source={{ uri: imageUri }}
          style={{
            height: IMAGE_WIDTH,
            width: IMAGE_WIDTH,
            alignSelf: "center",
          }}
        />
      </Box>

      <Text preset={"headingSmall"} weight={"bold"} mt={"s32"} mb={"s10"}>
        Escreva uma legenda
      </Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder={"Digite aqui"}
        containerProps={{ borderWidth: 0 }}
      />

      <Button title={"Publicar post"} mt={"s56"} />
    </Screen>
  );
}
