import React from "react";

import { Box, Screen, Text } from "@components";
import { AppScreenProps } from "@routes";

export function PostCommentScreen({
  route,
}: AppScreenProps<"PostCommentScreen">) {
  // TODO: remove this eslint disable line
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { postId } = route.params;

  return (
    <Screen scrollable canGoBack title={"Comentários"}>
      <Box>
        <Text preset={"headingLarge"}>Comentários</Text>
      </Box>
    </Screen>
  );
}
