import { PageAPI } from "@api";
import { PostCommentAPI } from "@domain";

import { userMocks } from "../User/mocks";

const POST_ID = 1;

const authUserPostCommentAPI: PostCommentAPI = {
  id: 1,
  message: "Comentário da Maria",
  user_id: 1,
  post_id: POST_ID,
  created_at: "2023-10-18T22:19:17.000+00:00",
  updated_at: "2023-10-21T07:46:21.821+00:00",
  user: userMocks.authUserAPI,

  meta: {},
};

const postCommentAPI: PostCommentAPI = {
  id: 2,
  message: "Comentário do Marcelo",
  user_id: 2,
  post_id: POST_ID,
  created_at: "2023-10-18T22:19:17.000+00:00",
  updated_at: "2023-10-21T07:46:21.821+00:00",
  user: {
    id: 2,
    first_name: "Marcelo",
    last_name: "Tavares",
    username: "celotavares",
    email: "celotavares@coffstack.com",

    profile_url:
      "https://nubble-development.s3.sa-east-1.amazonaws.com/backend-integration/6-marcelo.png",
    is_online: false,
    full_name: "Marcelo Tavares",
  },

  meta: {},
};

const postCommentListAPI: PageAPI<PostCommentAPI> = {
  meta: {
    total: 2,
    per_page: 10,
    current_page: 1,
    last_page: 1,
    first_page: 1,
    first_page_url: "/?page=1",
    last_page_url: "/?page=1",
    next_page_url: null,
    previous_page_url: null,
  },
  data: [authUserPostCommentAPI, postCommentAPI],
};

export const postCommentMocks = {
  POST_ID,
  postCommentListAPI,
  authUserPostCommentAPI,
  postCommentAPI,
};
