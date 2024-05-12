import { BASE_URL, PageAPI } from "@api";
import { POST_COMMENT_PATH, PostCommentAPI } from "@domain";
import { cloneDeep } from "lodash";
import { http, HttpResponse } from "msw";

import { postCommentMocks } from "./mocks";

const URL = `${BASE_URL}${POST_COMMENT_PATH}`;

let inMemoryResponse = cloneDeep(postCommentMocks.postCommentListAPI);

export function resetPostCommentInMemoryResponse() {
  inMemoryResponse = cloneDeep(postCommentMocks.postCommentListAPI);
}

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
        ...postCommentMocks.authUserPostCommentAPI,
        id: 999,
        post_id: body.post_id,
        message: body.message,
      };

      inMemoryResponse.data = [newPostCommentAPI, ...inMemoryResponse.data];
      inMemoryResponse.meta.total += 1;

      return HttpResponse.json(newPostCommentAPI, { status: 201 });
    },
  ),
  http.delete<{ postCommentId: string }>(
    `${URL}/:postCommentId`,
    async ({ params }) => {
      const { postCommentId } = params;

      inMemoryResponse.data = inMemoryResponse.data.filter(
        item => item.id.toString() !== postCommentId,
      );
      inMemoryResponse.meta.total -= 1;

      return HttpResponse.json({ message: "removed" }, { status: 200 });
    },
  ),
];
