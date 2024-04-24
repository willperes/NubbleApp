import React from "react";

import { PostComment } from "@domain";

import { Box, ProfileAvatar, Text } from "@components";

type PostCommentItemProps = {
  postComment: PostComment;
};

export function PostCommentItem({ postComment }: PostCommentItemProps) {
  return (
    <Box flexDirection={"row"} alignItems={"center"}>
      <ProfileAvatar imageURL={postComment.author.profileURL} />
      <Box ml={"s12"}>
        <Text preset={"paragraphSmall"} weight={"bold"}>
          {postComment.author.userName}
        </Text>
        <Text preset={"paragraphSmall"} color={"gray1"}>
          {postComment.message}
        </Text>
      </Box>
    </Box>
  );
}
