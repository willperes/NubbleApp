import React from "react";

import { Post } from "@domain";

import { Box, Text } from "@components";

type PostBottom = Pick<Post, "author" | "text" | "commentCount">;

export function PostBottom({ author, text, commentCount }: PostBottom) {
  function openComments() {
    // TODO: implement this
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
          onPress={openComments}
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
