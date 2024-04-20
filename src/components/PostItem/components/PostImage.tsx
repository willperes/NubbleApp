import React from "react";
import { Image, Dimensions } from "react-native";

import { Post } from "@domain";

type PostImageProps = Pick<Post, "imageURL">;

export function PostImage({ imageURL }: PostImageProps) {
  return (
    <Image
      source={{ uri: imageURL }}
      resizeMode={"cover"}
      height={300}
      width={Dimensions.get("window").width}
    />
  );
}
