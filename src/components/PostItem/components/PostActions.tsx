import React from "react";

import { Post } from "@domain";

import { Box, Icon, IconProps, Text, TouchableOpacityBox } from "@components";

type PostActionsProps = Pick<
  Post,
  "reactionCount" | "commentCount" | "favoriteCount"
>;

export function PostActions({
  reactionCount,
  commentCount,
  favoriteCount,
}: PostActionsProps) {
  function likePost() {
    // TODO: implement this
  }

  function navigateToComments() {
    // TODO: implement this
  }

  function favoritePost() {
    // TODO: implement this
  }

  return (
    <Box flexDirection={"row"} gap={"s24"} mt={"s16"}>
      <Item
        onPress={likePost}
        marked={true}
        icon={{ default: "heart", marked: "heartFill" }}
        label={reactionCount}
      />
      <Item
        onPress={navigateToComments}
        marked={false}
        icon={{ default: "comment", marked: "comment" }}
        label={commentCount}
      />
      <Item
        onPress={favoritePost}
        marked={true}
        icon={{ default: "bookmark", marked: "bookmarkFill" }}
        label={favoriteCount}
      />
    </Box>
  );
}

interface ItemProps {
  marked: boolean;
  icon: {
    default: IconProps["name"];
    marked: IconProps["name"];
  };
  label: number;
  onPress: () => void;
}

function Item({ marked, icon, label, onPress }: ItemProps) {
  return (
    <TouchableOpacityBox
      onPress={onPress}
      flexDirection={"row"}
      alignItems={"center"}
    >
      <Icon
        color={marked ? "marked" : undefined}
        name={marked ? icon.marked : icon.default}
      />
      {label > 0 && (
        <Text preset={"paragraphSmall"} weight={"bold"} ml={"s4"}>
          {label}
        </Text>
      )}
    </TouchableOpacityBox>
  );
}
