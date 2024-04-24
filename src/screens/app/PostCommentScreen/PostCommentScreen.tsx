import React from "react";
import { FlatList, ListRenderItemInfo } from "react-native";

import { PostComment, useListPostComments } from "@domain";

import { Screen } from "@components";
import { useAppSafeArea, useAppTheme } from "@hooks";
import { AppScreenProps } from "@routes";

import { PostCommentBottom, PostCommentItem } from "./components";

export function PostCommentScreen({
  route,
}: AppScreenProps<"PostCommentScreen">) {
  const { postId } = route.params;

  const { spacing } = useAppTheme();
  const { bottom } = useAppSafeArea();
  const { list, hasNextPage, fetchNextPage } = useListPostComments(postId);

  function renderItem({ item }: ListRenderItemInfo<PostComment>) {
    return <PostCommentItem postComment={item} />;
  }

  return (
    <Screen
      canGoBack
      title={"Comentários"}
      style={{ flex: 1, paddingBottom: 0 }}
    >
      <FlatList
        data={list}
        keyExtractor={({ id }) => id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{
          flexGrow: 1,
          gap: spacing.s16,
          paddingBottom: bottom,
        }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <PostCommentBottom
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
          />
        }
      />
    </Screen>
  );
}
