import React, { useRef } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  StyleProp,
  ViewStyle,
} from "react-native";

import { Post, usePostList } from "@domain";
import { useScrollToTop } from "@react-navigation/native";

import { PostItem, Screen } from "@components";

import { HomeEmpty } from "./components/HomeEmpty";
import { HomeHeader } from "./components/HomeHeader";

export function HomeScreen() {
  const {
    list: postList,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
  } = usePostList();

  const flatListRef = useRef<FlatList<Post>>(null);
  useScrollToTop(flatListRef);

  return (
    <Screen style={$screen}>
      <FlatList
        ref={flatListRef}
        data={postList}
        keyExtractor={({ id }) => id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.1}
        refreshing={isLoading}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        ListHeaderComponent={<HomeHeader />}
        ListEmptyComponent={
          <HomeEmpty refetch={refetch} loading={isLoading} error={isError} />
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
