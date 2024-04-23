import { apiAdapter } from "@api";
import { Page } from "@types";

import { postCommentAdapter } from "./postCommentAdapter";
import { postCommentApi } from "./postCommentApi";
import { PostComment } from "./postCommentTypes";

async function getList(
  postId: number,
  page: number,
): Promise<Page<PostComment>> {
  const postPageAPI = await postCommentApi.getList(postId, {
    page,
    per_page: 10,
  });
  return {
    data: postPageAPI.data.map(postCommentAdapter.toPostComment),
    meta: apiAdapter.toMetaDataPage(postPageAPI.meta),
  };
}

export const postCommentService = {
  getList,
};
