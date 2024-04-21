import React from "react";
import { Image, Dimensions } from "react-native";

import { Post } from "@domain";

import { useAppTheme } from "@hooks";

type PostImageProps = Pick<Post, "imageURL">;

export function PostImage({ imageURL }: PostImageProps) {
  const { spacing } = useAppTheme();

  return (
    <Image
      source={{ uri: imageURL }}
      resizeMode={"cover"}
      height={300}
      width={Dimensions.get("window").width}
      style={{ marginHorizontal: spacing.s24 * -1 }}
    />
  );
}
