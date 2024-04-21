import React from "react";
import { Image } from "react-native";

import { Post } from "@domain";

import { Box, Text } from "@components";

type PostHeaderProps = Pick<Post, "author">;

export function PostHeader({ author }: PostHeaderProps) {
  return (
    <Box flexDirection={"row"} mb={"s16"}>
      <Image
        source={{ uri: author.profileURL }}
        height={32}
        width={32}
        borderRadius={14}
      />
      <Text ml={"s12"} preset={"paragraphMedium"}>
        {author.userName}
      </Text>
    </Box>
  );
}
