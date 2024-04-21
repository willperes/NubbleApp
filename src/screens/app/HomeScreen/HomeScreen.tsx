import React, { useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  StyleProp,
  ViewStyle,
} from "react-native";

import { Post, postService } from "@domain";

import { PostItem, Screen } from "@components";

export function HomeScreen() {
  const [postList, setPostList] = useState<Post[]>([]);

  useEffect(() => {
    postService.getList().then(list => setPostList(list));
  }, []);

  return (
    <Screen style={$screen}>
      <FlatList
        data={postList}
        keyExtractor={({ id }) => id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}

function renderItem({ item }: ListRenderItemInfo<Post>) {
  return <PostItem post={item} />;
}

const $screen: StyleProp<ViewStyle> = {
  paddingTop: 0,
  paddingBottom: 0,
  paddingHorizontal: 0,
};
