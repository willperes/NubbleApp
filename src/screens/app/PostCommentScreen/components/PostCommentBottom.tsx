import React from "react";
import { Pressable } from "react-native";

import { Text } from "@components";

type PostCommentBottomProps = {
  hasNextPage: boolean;
  fetchNextPage: () => void;
};

export function PostCommentBottom({
  hasNextPage,
  fetchNextPage,
}: PostCommentBottomProps) {
  return hasNextPage ? (
    <Pressable style={{ alignItems: "center" }} onPress={fetchNextPage}>
      <Text color={"primary"} weight={"bold"} textAlign={"center"}>
        Ver mais
      </Text>
    </Pressable>
  ) : null;
}
