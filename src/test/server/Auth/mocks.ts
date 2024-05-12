import { AuthCredentials, userAdapter } from "@domain";

import { userMocks } from "../User/mocks";

const authCredentials: AuthCredentials = {
  token: "access-token",
  tokenExpiresAt: "2030-10-07T12:08:50.433+00:00",
  refreshToken: "refresh-token",
  user: userAdapter.toUser(userMocks.authUserAPI),
};

export const authMocks = { authCredentials };
