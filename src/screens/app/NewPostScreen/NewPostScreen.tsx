import React from "react";
import { Image, FlatList, ListRenderItemInfo, Dimensions } from "react-native";

import { useCameraRoll } from "@services";

import { Screen } from "@components";

import { Header } from "./components/Header";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const NUM_COLUMNS = 4;
const ITEM_SIZE = SCREEN_WIDTH / NUM_COLUMNS;

export function NewPostScreen() {
  const { photoList, fetchNextPage } = useCameraRoll(true);

  function renderItem({ item }: ListRenderItemInfo<string>) {
    return (
      <Image
        source={{ uri: item }}
        style={{ width: ITEM_SIZE, height: ITEM_SIZE }}
      />
    );
  }

  return (
    <Screen canGoBack title={"Novo post"} noHorizontalPadding>
      <>
        <FlatList
          data={photoList}
          keyExtractor={item => item}
          renderItem={renderItem}
          numColumns={NUM_COLUMNS}
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.1}
          ListHeaderComponent={
            <Header imageUri={photoList[0]} imageWidth={SCREEN_WIDTH} />
          }
        />
      </>
    </Screen>
  );
}
