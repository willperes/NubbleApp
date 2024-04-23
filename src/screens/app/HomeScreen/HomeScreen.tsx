import React from "react";
import {
  FlatList,
  ListRenderItemInfo,
  StyleProp,
  ViewStyle,
} from "react-native";

import { Post, useListPosts } from "@domain";

import { PostItem, Screen } from "@components";

import { HomeEmpty } from "./components/HomeEmpty";
import { HomeHeader } from "./components/HomeHeader";

export function HomeScreen() {
  const { postList, isLoading, error, refetch, fetchNextPage } = useListPosts();

  return (
    <Screen style={$screen}>
      <FlatList
        data={postList}
        keyExtractor={({ id }) => id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={<HomeHeader />}
        ListEmptyComponent={
          <HomeEmpty refetch={refetch} loading={isLoading} error={error} />
        }
        contentContainerStyle={{ flexGrow: 1 }}
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
  flex: 1,
};
