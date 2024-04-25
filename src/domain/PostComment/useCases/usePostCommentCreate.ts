import { useState } from "react";

import { postCommentService } from "../postCommentService";
import { PostComment } from "../postCommentTypes";

interface Options {
  onSuccess?: (data: PostComment) => void;
  onError?: (message: string) => void;
}

export function usePostCommentCreate(postId: number, options: Options) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean | null>(null);

  async function createComment(message: string): Promise<void> {
    setLoading(true);
    setError(null);

    try {
      const postComment = await postCommentService.create(postId, message);
      if (options?.onSuccess) {
        options.onSuccess(postComment);
      }
    } catch (err) {
      if (options?.onError) {
        options.onError("Erro ao criar comentário.");
      }

      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, createComment };
}
