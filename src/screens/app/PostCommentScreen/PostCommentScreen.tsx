import React, { useEffect } from "react";

import { useListPostComments } from "@domain";

import { Box, Screen, Text } from "@components";
import { AppScreenProps } from "@routes";

export function PostCommentScreen({
  route,
}: AppScreenProps<"PostCommentScreen">) {
  const { postId } = route.params;
  const { list } = useListPostComments(postId);

  useEffect(() => {
    console.log("list", list);
  }, [list]);

  return (
    <Screen scrollable canGoBack title={"Comentários"}>
      <Box>
        <Text preset={"headingLarge"}>Comentários</Text>
      </Box>
    </Screen>
  );
}
