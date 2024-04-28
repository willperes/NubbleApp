import { MutationOptions, QueryKeys } from "@infra";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postCommentService } from "../postCommentService";
import { PostComment } from "../postCommentTypes";

type CreateCommentVariables = { message: string };

interface UsePostCommentCreateResult {
  isLoading: boolean;
  isError: boolean;
  createComment: (variables: CreateCommentVariables) => Promise<void>;
}

export function usePostCommentCreate(
  postId: number,
  options?: MutationOptions<PostComment>,
): UsePostCommentCreateResult {
  async function createComment(variables: CreateCommentVariables) {
    mutate(variables);
  }

  const queryClient = useQueryClient();
  const { isLoading, isError, mutate } = useMutation<
    PostComment,
    unknown,
    CreateCommentVariables
  >({
    mutationFn: variables =>
      postCommentService.create(postId, variables.message),
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
