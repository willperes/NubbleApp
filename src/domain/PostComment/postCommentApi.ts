import { PageAPI, PageParams, api } from "@api";

import { PostCommentAPI } from "./postCommentTypes";

const PATH = "user/post_comment";

type PostCommentResponseAPI = PageAPI<PostCommentAPI>;

async function getList(
  post_id: number,
  pageParams?: PageParams,
): Promise<PostCommentResponseAPI> {
  const { data } = await api.get<PostCommentResponseAPI>(PATH, {
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
  const { data } = await api.post<PostCommentAPI>(PATH, {
    post_id,
    message,
  });

  return data;
}

async function remove(post_comment_id: number): Promise<{ message: string }> {
  const { data } = await api.delete<{ message: string }>(
    `${PATH}/${post_comment_id}`,
  );

  return data;
}

export const postCommentApi = {
  getList,
  create,
  remove,
};
