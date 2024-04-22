import { PageAPI, api } from "@api";

import { PostAPI } from "./postTypes";

type PostResponseAPI = PageAPI<PostAPI>;

async function getList(): Promise<PostResponseAPI> {
  await new Promise(resolve => setTimeout(() => resolve(true), 1000));

  const response = await api.get<PostResponseAPI>("user/post");
  return response.data;
}

export const postApi = {
  getList,
};
