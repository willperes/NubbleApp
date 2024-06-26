import React, { useRef, useState } from "react";
import {
  Image,
  FlatList,
  ListRenderItemInfo,
  Dimensions,
  Pressable,
} from "react-native";

import {
  PermissionName,
  useMultimediaGetPhotos,
  usePermission,
} from "@services";

import { PermissionManager, Screen } from "@components";

import { Header } from "./components/Header";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const NUM_COLUMNS = 4;
const ITEM_SIZE = SCREEN_WIDTH / NUM_COLUMNS;

const PERMISSION_NAME: PermissionName = "photoLibrary";

export function NewPostScreen() {
  const flatListRef = useRef<FlatList>(null);

  const [selectedImage, setSelectedImage] = useState<string>();
  const permission = usePermission(PERMISSION_NAME);
  const { photoList, fetchNextPage } = useMultimediaGetPhotos(
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
    <PermissionManager
      permissionName={PERMISSION_NAME}
      description={
        "Permita o Nubble acessar suas fotos da galeria para criar um novo post."
      }
    >
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
    </PermissionManager>
  );
}
