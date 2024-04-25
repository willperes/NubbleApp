import React, { useState } from "react";
import { Keyboard } from "react-native";

import { usePostCommentCreate } from "@domain";

import { TextMessage } from "@components";

interface PostCommentTextMessageProps {
  postId: number;
  onAddComment: () => void;
}

export function PostCommentTextMessage({
  postId,
  onAddComment,
}: PostCommentTextMessageProps) {
  const [message, setMessage] = useState("");

  const { mutate: createComment } = usePostCommentCreate({
    onSuccess: onCommentCreated,
  });

  function onPressSend() {
    createComment({ message, postId });
  }

  async function onCommentCreated() {
    setMessage("");
    Keyboard.dismiss();
    onAddComment();
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
