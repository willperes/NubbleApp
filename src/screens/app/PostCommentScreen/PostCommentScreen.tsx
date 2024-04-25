import React, { useState } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";

import { PostComment, useListPostComments } from "@domain";

import { TextMessage, Screen } from "@components";
import { useAppTheme } from "@hooks";
import { AppScreenProps } from "@routes";

import { PostCommentBottom, PostCommentItem } from "./components";

export function PostCommentScreen({
  route,
}: AppScreenProps<"PostCommentScreen">) {
  const { postId } = route.params;

  const [message, setMessage] = useState("");

  const { spacing } = useAppTheme();
  const { list, hasNextPage, fetchNextPage } = useListPostComments(postId);

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
      <TextMessage
        value={message}
        onChangeText={setMessage}
        placeholder={"Adicione um comentário"}
        onPressSend={() => {}}
      />
    </Screen>
  );
}
