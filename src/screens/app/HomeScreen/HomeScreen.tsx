import React, { useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  StyleProp,
  ViewStyle,
} from "react-native";

import { Post, postService } from "@domain";

import { PostItem, Screen } from "@components";

import { HomeEmpty } from "./components/HomeEmpty";
import { HomeHeader } from "./components/HomeHeader";

export function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [postList, setPostList] = useState<Post[]>([]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchData(): Promise<void> {
    try {
      setIsLoading(true);
      setError(false);

      const list = await postService.getList();
      setPostList(list);
    } catch (err) {
      console.error("ERRO", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Screen style={$screen}>
      <FlatList
        data={postList}
        keyExtractor={({ id }) => id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<HomeHeader />}
        ListEmptyComponent={
          <HomeEmpty refetch={fetchData} loading={isLoading} error={error} />
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
