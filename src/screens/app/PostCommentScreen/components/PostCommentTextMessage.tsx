import React, { useState } from "react";
import { Keyboard } from "react-native";

import { usePostCommentCreate } from "@domain";

import { TextMessage } from "@components";

interface PostCommentTextMessageProps {
  postId: number;
}

export function PostCommentTextMessage({
  postId,
}: PostCommentTextMessageProps) {
  const [message, setMessage] = useState("");

  const { createComment } = usePostCommentCreate(postId, {
    onSuccess: onCommentCreated,
  });

  function onPressSend() {
    createComment({ message });
  }

  async function onCommentCreated() {
    setMessage("");
    Keyboard.dismiss();
  }

  return (
    <TextMessage
      value={message}
      onChangeText={setMessage}
      placeholder={"Adicione um comentário"}
      onPressSend={onPressSend}
    />
  );
}
