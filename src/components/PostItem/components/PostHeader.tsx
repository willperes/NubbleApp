import React from "react";

import { Post } from "@domain";

import { Box, ProfileAvatar, Text } from "@components";

type PostHeaderProps = Pick<Post, "author">;

export function PostHeader({ author }: PostHeaderProps) {
  return (
    <Box flexDirection={"row"} mb={"s16"}>
      <ProfileAvatar imageURL={author.profileURL} />
      <Text ml={"s12"} preset={"paragraphMedium"}>
        {author.userName}
      </Text>
    </Box>
  );
}
