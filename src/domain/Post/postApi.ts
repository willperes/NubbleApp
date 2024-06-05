import { PageAPI, PageParams, api } from "@api";
import { ImageForUpload } from "@services";

import { PostAPI } from "./postTypes";

type PostResponseAPI = PageAPI<PostAPI>;

async function getList(params?: PageParams): Promise<PostResponseAPI> {
  await new Promise(resolve => setTimeout(() => resolve(true), 1000));

  const response = await api.get<PostResponseAPI>("user/post", {
    params,
  });
  return response.data;
}

async function createPost(
  text: string,
  imageCover: ImageForUpload,
): Promise<PostAPI> {
  const form = new FormData();
  form.append("text", text);
  form.append("imageCover", imageCover);

  const response = await api.postForm<PostAPI>("user/post", form);
  return response.data;
}

export const postApi = {
  getList,
  createPost,
};
