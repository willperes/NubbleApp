import React from "react";
import { FlatList, ListRenderItemInfo } from "react-native";

import { PostComment, usePostCommentList, useUser } from "@domain";

import { Screen } from "@components";
import { useAppTheme } from "@hooks";
import { AppScreenProps } from "@routes";

import {
  PostCommentBottom,
  PostCommentItem,
  PostCommentEmpty,
  PostCommentTextMessage,
} from "./components";

export function PostCommentScreen({
  route,
}: AppScreenProps<"PostCommentScreen">) {
  const { postId, postAuthorId } = route.params;

  const { id: userId } = useUser();
  const { list, loading, hasNextPage, fetchNextPage, refresh } =
    usePostCommentList(postId);
  const { spacing } = useAppTheme();

  function renderItem({ item }: ListRenderItemInfo<PostComment>) {
    return (
      <PostCommentItem
        postComment={item}
        userId={userId}
        postAuthorId={postAuthorId}
        onRemoveComment={refresh}
      />
    );
  }

  return (
    <Screen canGoBack title={"Comentários"} flex={1}>
      <FlatList
        data={list}
        keyExtractor={({ id }) => id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{
          flexGrow: 1,
          gap: spacing.s16,
          paddingBottom: spacing.s20,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<PostCommentEmpty loading={loading} />}
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
