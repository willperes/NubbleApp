import { apiAdapter } from "@api";
import { Page } from "@types";

import { postCommentAdapter } from "./postCommentAdapter";
import { postCommentApi } from "./postCommentApi";
import { PostComment } from "./postCommentTypes";

async function getList(
  postId: number,
  page: number,
): Promise<Page<PostComment>> {
  const postCommentPageAPI = await postCommentApi.getList(postId, {
    page,
    per_page: 10,
  });
  return apiAdapter.toPageModel(
    postCommentPageAPI,
    postCommentAdapter.toPostComment,
  );
}

async function create(postId: number, message: string): Promise<PostComment> {
  const postCommentAPI = await postCommentApi.create(postId, message);

  return postCommentAdapter.toPostComment(postCommentAPI);
}

async function remove(postCommentId: number): Promise<string> {
  const { message } = await postCommentApi.remove(postCommentId);

  return message;
}

/**
 * @description user can remove the comment if they are the post or post comment author
 *
 * @param userId the current session user id
 * @param postComment comment to be deleted
 * @param postAuthorId the post author id
 */
function isAllowedToRemove(
  postComment: PostComment,
  userId: number | null,
  postAuthorId: number,
): boolean {
  if (postComment.author.id === userId) {
    return true;
  }

  if (postAuthorId === userId) {
    return true;
  }

  return false;
}

export const postCommentService = {
  getList,
  create,
  remove,
  isAllowedToRemove,
};
