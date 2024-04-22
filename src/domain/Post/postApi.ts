import { PageAPI } from "@api";

import { PostAPI } from "./postTypes";

type PostResponseAPI = PageAPI<PostAPI>;

async function getList(): Promise<PostResponseAPI> {
  const response = await fetch("http://localhost:3333/user/post", {
    method: "GET",
    headers: {
      Authorization:
        "Bearer Ng.4w4pZ8OFK2Q7f5PzzCmqQdlcrmX3u__HBwB76Ho_rSSgfw8Zf3gh2-XtYYW6",
    },
  });

  const data: PostResponseAPI = await response.json();

  return data;
}

export const postApi = {
  getList,
};
