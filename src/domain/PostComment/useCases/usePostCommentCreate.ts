import { MutationOptions, QueryKeys } from "@infra";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postCommentService } from "../postCommentService";
import { PostComment } from "../postCommentTypes";

type CreateCommentMutationVariables = { message: string };

export function usePostCommentCreate(
  postId: number,
  options?: MutationOptions<PostComment>,
) {
  async function createComment(params: CreateCommentMutationVariables) {
    mutate(params);
  }

  const queryClient = useQueryClient();
  const { isLoading, isError, mutate } = useMutation<
    PostComment,
    unknown,
    CreateCommentMutationVariables
  >({
    mutationFn: params => postCommentService.create(postId, params.message),
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PostCommentList, postId],
      });

      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: () => {
      if (options?.onError) {
        options.onError(
          options.errorMessage || "Ocorreu um erro ao criar comentário.",
        );
      }
    },
  });

  return {
    isLoading,
    isError,
    createComment,
  };
}
