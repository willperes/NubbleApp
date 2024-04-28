import { MutationOptions, QueryKeys } from "@infra";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postCommentService } from "../postCommentService";

type RemoveCommentVariables = { postCommentId: number };

interface UsePostCommentRemoveResult {
  isLoading: boolean;
  isError: boolean;
  removeComment: (variables: RemoveCommentVariables) => void;
}

export function usePostCommentRemove(
  postId: number,
  options?: MutationOptions<string>,
): UsePostCommentRemoveResult {
  const queryClient = useQueryClient();
  const { isLoading, isError, mutate } = useMutation<
    string,
    unknown,
    RemoveCommentVariables
  >({
    mutationFn: ({ postCommentId }) => postCommentService.remove(postCommentId),
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
        options.onError(options.errorMessage || "Erro ao remover comentário");
      }
    },
  });

  async function removeComment(variables: RemoveCommentVariables) {
    return mutate(variables);
  }

  return {
    isLoading,
    isError,
    removeComment,
  };
}
