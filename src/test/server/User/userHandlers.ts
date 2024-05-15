import { BASE_URL, PageAPI } from "@api";
import { USER_PATH, UserAPI } from "@domain";
import { HttpResponse, http } from "msw";

import { userMocks } from "./mocks";

const URL = `${BASE_URL}${USER_PATH}`;

export const userHandlers = [
  http.get(URL, async () => {
    const response: PageAPI<UserAPI> = userMocks.userPageAPI;

    return HttpResponse.json(response, { status: 200 });
  }),
  http.get<{ userId: string }>(`${URL}/:userId`, async ({ params }) => {
    const userApi = userMocks.userPageAPI.data.find(
      user => user.id.toString() === params.userId,
    );

    return HttpResponse.json(userApi, { status: 200 });
  }),
];
