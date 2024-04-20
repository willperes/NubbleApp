import React, { useEffect, useState } from "react";

import { Post, postService } from "@domain";

import { Screen, Text } from "@components";

export function HomeScreen() {
  const [postList, setPostList] = useState<Post[]>([]);

  useEffect(() => {
    console.log("AQUI");
    postService.getList().then(list => setPostList(list));
  }, []);

  return (
    <Screen scrollable>
      {postList.map(post => (
        <Text key={post.id}>{post.text}</Text>
      ))}
    </Screen>
  );
}
