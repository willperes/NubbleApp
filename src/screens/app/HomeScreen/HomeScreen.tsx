import React from "react";
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  StyleProp,
  ViewStyle,
} from "react-native";

import { Post, useListPosts } from "@domain";

import { PostItem, Screen } from "@components";

import { HomeEmpty } from "./components/HomeEmpty";
import { HomeHeader } from "./components/HomeHeader";

export function HomeScreen() {
  const { postList, loading, error, refresh, fetchNextPage } = useListPosts();

  return (
    <Screen style={$screen}>
      <FlatList
        data={postList}
        keyExtractor={({ id }) => id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.1}
        refreshing={loading}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
        ListHeaderComponent={<HomeHeader />}
        ListEmptyComponent={
          <HomeEmpty refetch={refresh} loading={loading} error={error} />
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
