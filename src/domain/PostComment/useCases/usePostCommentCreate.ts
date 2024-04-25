import { MutationOptions, useMutation } from "@infra";

import { postCommentService } from "../postCommentService";
import { PostComment } from "../postCommentTypes";

type CreateCommentMutationParams = { postId: number; message: string };

export function usePostCommentCreate(options: MutationOptions<PostComment>) {
  async function createCommentMutation(params: CreateCommentMutationParams) {
    return postCommentService.create(params.postId, params.message);
  }

  return useMutation<CreateCommentMutationParams, PostComment>(
    createCommentMutation,
    options,
  );
}
