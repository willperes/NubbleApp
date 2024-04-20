import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";

import { Post, postService } from "@domain";

import { PostItem, Screen } from "@components";

export function HomeScreen() {
  const [postList, setPostList] = useState<Post[]>([]);

  useEffect(() => {
    console.log("AQUI");
    postService.getList().then(list => setPostList(list));
  }, []);

  return (
    <Screen>
      <FlatList
        data={postList}
        keyExtractor={({ id }) => id}
        renderItem={renderItem}
      />
    </Screen>
  );
}

function renderItem({ item }: ListRenderItemInfo<Post>) {
  return <PostItem post={item} />;
}
