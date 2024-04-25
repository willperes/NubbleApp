import React from "react";
import { Alert, Pressable } from "react-native";

import { PostComment, postCommentService, usePostCommentRemove } from "@domain";

import { Box, ProfileAvatar, Text } from "@components";

type PostCommentItemProps = {
  postComment: PostComment;
  userId: number;
  postAuthorId: number;

  onRemoveComment: () => void;
};

export function PostCommentItem({
  postComment,
  userId,
  postAuthorId,
  onRemoveComment,
}: PostCommentItemProps) {
  const { mutate } = usePostCommentRemove({ onSuccess: onRemoveComment });

  const isAllowedToRemove = postCommentService.isAllowedToRemove(
    postComment,
    userId,
    postAuthorId,
  );

  function removeComment() {
    mutate({ postCommentId: postComment.id });
  }

  function confirmRemove() {
    Alert.alert(
      "Remover comentário",
      "Deseja remover o comentário? Clique em Confirmar para remover o comentário",
      [
        {
          text: "Confirmar",
          onPress: removeComment,
        },
        { text: "Cancelar", style: "cancel" },
      ],
    );
  }

  return (
    <Pressable disabled={!isAllowedToRemove} onLongPress={confirmRemove}>
      <Box flexDirection={"row"} alignItems={"center"}>
        <ProfileAvatar imageURL={postComment.author.profileURL} />
        <Box ml={"s12"} flex={1}>
          <Text preset={"paragraphSmall"} weight={"bold"}>
            {postComment.author.userName}
          </Text>
          <Text preset={"paragraphSmall"} color={"gray1"}>
            {postComment.message} - {postComment.createdAtRelative}
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
}
