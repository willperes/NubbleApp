import { PageAPI, api } from "@api";

import { PostAPI } from "./postTypes";

type PostResponseAPI = PageAPI<PostAPI>;

async function getList(): Promise<PostResponseAPI> {
  const response = await api.get<PostResponseAPI>("user/post");
  return response.data;
}

export const postApi = {
  getList,
};
