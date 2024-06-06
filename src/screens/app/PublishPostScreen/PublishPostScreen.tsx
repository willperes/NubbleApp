import React, { useState } from "react";
import { Dimensions, Image } from "react-native";

import { usePostCreate } from "@domain";
import { useToastService } from "@services";

import { Box, Button, Screen, Text, TextInput } from "@components";
import { AppScreenProps } from "@routes";

const IMAGE_WIDTH = Dimensions.get("screen").width / 2;

export function PublishPostScreen({
  navigation,
  route,
}: AppScreenProps<"PublishPostScreen">) {
  const { imageUri } = route.params;

  const { showToast } = useToastService();
  const { createPost, isLoading } = usePostCreate({
    onSuccess: () => {
      showToast({ message: "Foto publicada", type: "success" });
      navigation.navigate("AppTabNavigator", { screen: "HomeScreen" });
    },
  });
  const [description, setDescription] = useState("");

  function handlePublishPost() {
    createPost({ description, imageUri });
  }

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

      <Button
        disabled={!description || isLoading}
        loading={isLoading}
        title={"Publicar post"}
        mt={"s56"}
        onPress={handlePublishPost}
      />
    </Screen>
  );
}
