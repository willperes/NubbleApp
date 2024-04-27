import React from "react";

import { ActivityIndicator, Box, Text } from "@components";

interface PostCommentEmptyProps {
  loading: boolean;
}

export function PostCommentEmpty({ loading }: PostCommentEmptyProps) {
  let component = (
    <Text preset={"paragraphMedium"}>Seja o primeiro a comentar</Text>
  );

  if (loading) {
    component = <ActivityIndicator color={"primary"} />;
  }

  return (
    <Box flex={1} justifyContent={"center"} alignItems={"center"}>
      {component}
    </Box>
  );
}
