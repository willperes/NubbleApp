import React from "react";

import { Post } from "@domain";
import { useNavigation } from "@react-navigation/native";

import { Box, Text } from "@components";

type PostBottom = Pick<Post, "author" | "text" | "commentCount" | "id">;

export function PostBottom({ author, text, commentCount, id }: PostBottom) {
  const navigation = useNavigation();

  function navigateToPostCommentScreen() {
    navigation.navigate("PostCommentScreen", {
      postId: id,
      postAuthorId: author.id,
    });
  }

  const commentText = getCommentText(commentCount);

  return (
    <Box pt={"s16"}>
      <Text preset={"paragraphMedium"} weight={"bold"}>
        {author.userName}
      </Text>
      <Text preset={"paragraphMedium"} color={"gray1"}>
        {text}
      </Text>

      {commentText && (
        <Text
          preset={"paragraphSmall"}
          weight={"bold"}
          color={"primary"}
          onPress={navigateToPostCommentScreen}
          mt={"s8"}
        >
          {commentText}
        </Text>
      )}
    </Box>
  );
}

function getCommentText(commentCount: number) {
  if (commentCount === 0) {
    return null;
  }

  if (commentCount === 1) {
    return "ver 1 comentário";
  }

  return `ver ${commentCount} comentários`;
}
