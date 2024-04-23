import { PageAPI, PageParams, api } from "@api";

import { PostAPI } from "./postTypes";

type PostResponseAPI = PageAPI<PostAPI>;

async function getList(params?: PageParams): Promise<PostResponseAPI> {
  await new Promise(resolve => setTimeout(() => resolve(true), 1000));

  const response = await api.get<PostResponseAPI>("user/post", {
    params,
  });
  return response.data;
}

export const postApi = {
  getList,
};
