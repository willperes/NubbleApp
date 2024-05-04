import { AuthCredentials } from "src/domain/Auth/authTypes";

export const mockedAuthCredentials: AuthCredentials = {
  token: "access-token",
  tokenExpiresAt: "2023-10-07T12:00:00.433+00:00",
  refreshToken: "refresh-token",
  user: {
    id: 1,
    firstName: "Willian",
    lastName: "Peres",
    username: "willperes",
    email: "will.peres@outlook.com",
    profileUrl: "https://github.com/willperes.png",
    isOnline: false,
    fullName: "Willian Peres",
  },
};
