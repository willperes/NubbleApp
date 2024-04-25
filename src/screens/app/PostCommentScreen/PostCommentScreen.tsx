import React from "react";
import { FlatList, ListRenderItemInfo } from "react-native";

import { PostComment, usePostCommentList } from "@domain";

import { Screen } from "@components";
import { useAppTheme } from "@hooks";
import { AppScreenProps } from "@routes";

import {
  PostCommentBottom,
  PostCommentItem,
  PostCommentTextMessage,
} from "./components";

export function PostCommentScreen({
  route,
}: AppScreenProps<"PostCommentScreen">) {
  const { postId } = route.params;

  const { spacing } = useAppTheme();
  const { list, hasNextPage, fetchNextPage, refresh } =
    usePostCommentList(postId);

  function renderItem({ item }: ListRenderItemInfo<PostComment>) {
    return <PostCommentItem postComment={item} />;
  }

  return (
    <Screen canGoBack title={"Comentários"} flex={1}>
      <FlatList
        data={list}
        keyExtractor={({ id }) => id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{
          gap: spacing.s16,
          paddingBottom: spacing.s20,
        }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <PostCommentBottom
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
          />
        }
      />
      <PostCommentTextMessage postId={postId} onAddComment={refresh} />
    </Screen>
  );
}
