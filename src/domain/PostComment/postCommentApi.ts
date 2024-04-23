import { PageAPI, PageParams, api } from "@api";

import { PostCommentAPI } from "./postCommentTypes";

type PostCommentResponseAPI = PageAPI<PostCommentAPI>;

async function getList(
  post_id: number,
  pageParams?: PageParams,
): Promise<PostCommentResponseAPI> {
  const { data } = await api.get<PostCommentResponseAPI>("user/post_comment", {
    params: {
      post_id,
      ...pageParams,
    },
  });

  return data;
}

export const postCommentApi = {
  getList,
};
