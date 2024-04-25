import { MutationOptions, useMutation } from "@infra";

import { postCommentService } from "../postCommentService";
import { PostComment } from "../postCommentTypes";

type CreateCommentMutationParams = { message: string };

export function usePostCommentCreate(
  postId: number,
  options: MutationOptions<PostComment>,
) {
  async function createCommentMutation(params: CreateCommentMutationParams) {
    return postCommentService.create(postId, params.message);
  }

  const { mutate, loading, error } = useMutation<
    CreateCommentMutationParams,
    PostComment
  >(createCommentMutation, options);

  async function createComment(message: string): Promise<void> {
    await mutate({ message });
  }

  return { loading, error, createComment };
}
