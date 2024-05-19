import React, { useRef, useState } from "react";
import {
  Image,
  FlatList,
  ListRenderItemInfo,
  Dimensions,
  Pressable,
} from "react-native";

import { useCameraRoll, usePermission } from "@services";

import { Screen } from "@components";

import { Header } from "./components/Header";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const NUM_COLUMNS = 4;
const ITEM_SIZE = SCREEN_WIDTH / NUM_COLUMNS;

export function NewPostScreen() {
  const flatListRef = useRef<FlatList>(null);

  const [selectedImage, setSelectedImage] = useState<string>();
  const permission = usePermission("photoLibrary");
  const { photoList, fetchNextPage } = useCameraRoll(
    permission.status === "granted",
    onSelectImage,
  );

  function onSelectImage(imageUri: string) {
    setSelectedImage(imageUri);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }

  function renderItem({ item }: ListRenderItemInfo<string>) {
    return (
      <Pressable onPress={() => onSelectImage(item)}>
        <Image
          source={{ uri: item }}
          style={{ width: ITEM_SIZE, height: ITEM_SIZE }}
        />
      </Pressable>
    );
  }

  return (
    <Screen
      canGoBack
      title={"Novo post"}
      noHorizontalPadding
      flex={1}
      style={{ paddingBottom: 0 }}
    >
      <FlatList
        ref={flatListRef}
        data={photoList}
        keyExtractor={item => item}
        renderItem={renderItem}
        numColumns={NUM_COLUMNS}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={
          <Header imageUri={selectedImage} imageWidth={SCREEN_WIDTH} />
        }
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </Screen>
  );
}
