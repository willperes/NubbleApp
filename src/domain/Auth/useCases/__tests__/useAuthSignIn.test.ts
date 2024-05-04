import { renderHook, waitFor } from "@testing-library/react-native";
import { AllTheProviders } from "test-utils";

import { authService } from "../../authService";
import { useAuthSignIn } from "../useAuthSignIn";

import { mockedAuthCredentials } from "./mockedData/mocks";

const mockedSaveCredentials = jest.fn();
jest.mock("@services", () => {
  const originalModule = jest.requireActual("@services");
  return {
    ...originalModule,
    useAuthCredentials: () => ({
      saveCredentials: mockedSaveCredentials,
    }),
  };
});

describe("useAuthSignIn", () => {
  it("calls the saveCredentials function if the sign in is successful", async () => {
    jest
      .spyOn(authService, "signIn")
      .mockResolvedValueOnce(mockedAuthCredentials);

    const { result } = renderHook(() => useAuthSignIn(), {
      wrapper: AllTheProviders,
    });

    const { signIn } = result.current;
    signIn({ email: "will.peres@outlook.com", password: "12345" });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockedSaveCredentials).toHaveBeenCalledWith(mockedAuthCredentials);
  });

  it("calls the options.onError function with an error message if the sign in fails", async () => {
    const errorMessage = "This is an error message";
    jest
      .spyOn(authService, "signIn")
      .mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

    const mockedOnError = jest.fn();
    const { result } = renderHook(
      () => useAuthSignIn({ onError: mockedOnError }),
      { wrapper: AllTheProviders },
    );

    const { signIn } = result.current;
    signIn({ email: "will.peres@outlook.com", password: "12345" });

    await waitFor(() => {
      expect(mockedOnError).toHaveBeenCalledWith(errorMessage);
    });
  });
});
