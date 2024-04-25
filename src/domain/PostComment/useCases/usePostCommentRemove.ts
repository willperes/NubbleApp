import { MutationOptions, useMutation } from "@infra";

import { postCommentService } from "../postCommentService";

type RemoveCommentMutationParams = { postCommentId: number };

export function usePostCommentRemove(options?: MutationOptions<string>) {
  async function removeCommentMutation(params: RemoveCommentMutationParams) {
    return postCommentService.remove(params.postCommentId);
  }

  return useMutation<RemoveCommentMutationParams, string>(
    removeCommentMutation,
    options,
  );
}
