import { BASE_URL, PageAPI } from "@api";
import { POST_COMMENT_PATH, PostCommentAPI } from "@domain";
import { http, HttpResponse } from "msw";

import { mockedData } from "./mocks";

const URL = `${BASE_URL}${POST_COMMENT_PATH}`;

let inMemoryResponse = { ...mockedData.postCommentListAPI };

export const postCommentHandlers = [
  http.get(URL, async () => {
    const response: PageAPI<PostCommentAPI> = inMemoryResponse;
    return HttpResponse.json(response, { status: 200 });
  }),
  http.post<any, { post_id: number; message: string }>(
    URL,
    async ({ request }) => {
      const body = await request.json();

      const newPostCommentAPI: PostCommentAPI = {
        ...mockedData.postCommentAPI,
        id: 999,
        post_id: body.post_id,
        message: body.message,
      };

      inMemoryResponse.data = [newPostCommentAPI, ...inMemoryResponse.data];
      inMemoryResponse.meta.total += 1;

      return HttpResponse.json(newPostCommentAPI, { status: 201 });
    },
  ),
];
