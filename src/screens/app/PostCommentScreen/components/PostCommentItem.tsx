import React from "react";
import { Alert, Pressable } from "react-native";

import { PostComment, postCommentService, usePostCommentRemove } from "@domain";
import { useToastService } from "@services";

import { Box, ProfileAvatar, Text } from "@components";

type PostCommentItemProps = {
  postId: number;
  postComment: PostComment;
  userId: number;
  postAuthorId: number;
};

export function PostCommentItem({
  postId,
  postComment,
  userId,
  postAuthorId,
}: PostCommentItemProps) {
  const { showToast } = useToastService();
  const { removeComment } = usePostCommentRemove(postId, {
    onSuccess: onCommentRemoved,
  });

  const isAllowedToRemove = postCommentService.isAllowedToRemove(
    postComment,
    userId,
    postAuthorId,
  );

  function onConfirmRemoveComment() {
    removeComment({ postCommentId: postComment.id });
  }

  function confirmRemove() {
    Alert.alert(
      "Remover comentário",
      "Deseja remover o comentário? Clique em Confirmar para remover o comentário",
      [
        {
          text: "Confirmar",
          onPress: onConfirmRemoveComment,
        },
        { text: "Cancelar", style: "cancel" },
      ],
    );
  }

  function onCommentRemoved() {
    showToast({
      message: "Comentário deletado",
      position: "bottom",
      duration: 5 * 1000,
    });
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
