import React from "react";
import { Image } from "react-native";

import { useCameraRoll } from "@services";

import { Screen, Text } from "@components";

export function NewPostScreen() {
  const { list } = useCameraRoll();

  return (
    <Screen scrollable>
      <>
        <Text preset={"headingLarge"}>New Post Screen</Text>
        {list.map(photo => (
          <Image
            key={photo}
            source={{ uri: photo }}
            style={{ width: 200, height: 200 }}
          />
        ))}
      </>
    </Screen>
  );
}
