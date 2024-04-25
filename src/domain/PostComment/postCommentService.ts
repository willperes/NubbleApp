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
    per_page: 15,
  });
  return {
    data: postCommentPageAPI.data.map(postCommentAdapter.toPostComment),
    meta: apiAdapter.toMetaDataPage(postCommentPageAPI.meta),
  };
}

async function create(postId: number, message: string): Promise<PostComment> {
  const postCommentAPI = await postCommentApi.create(postId, message);

  return postCommentAdapter.toPostComment(postCommentAPI);
}

async function remove(postCommentId: number): Promise<string> {
  const { message } = await postCommentApi.remove(postCommentId);

  return message;
}

export const postCommentService = {
  getList,
  create,
  remove,
};
