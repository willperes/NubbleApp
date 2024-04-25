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

async function create(
  post_id: number,
  message: string,
): Promise<PostCommentAPI> {
  const { data } = await api.post<PostCommentAPI>("user/post_comment", {
    post_id,
    message,
  });

  return data;
}

export const postCommentApi = {
  getList,
  create,
};
