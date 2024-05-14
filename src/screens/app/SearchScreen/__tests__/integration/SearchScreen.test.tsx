import React from "react";

import { authCredentialsStorage } from "@services";
import { authMocks, server, userMocks } from "@test";
import { fireEvent, renderScreen, screen } from "test-utils";

import { AppStack } from "@routes";

jest.unmock("@react-navigation/native");

describe("Integration: SearchScreen", () => {
  beforeAll(() => {
    server.listen();
    jest
      .spyOn(authCredentialsStorage, "get")
      .mockResolvedValue(authMocks.authCredentials);
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
    jest.resetAllMocks();
  });

  test("Search user flow", async () => {
    renderScreen(<AppStack initialRouteName={"SearchScreen"} />);

    const searchInputElement = screen.getByPlaceholderText("Digite sua busca");
    fireEvent.changeText(searchInputElement, "mar");

    const authUserElement = await screen.findByText(
      userMocks.authUserAPI.username,
    );
    expect(authUserElement).toBeTruthy();

    const userElement = await screen.findByText(userMocks.userAPI.username);
    expect(userElement).toBeTruthy();

    // Click on the auth user to navigate to the ProfileScreen
    fireEvent.press(authUserElement);

    // Verify that the ProfileScreen was displayed with the auth user data
    const authUserFullNameElement = await screen.findByText(
      userMocks.authUserAPI.full_name,
    );
    expect(authUserFullNameElement).toBeTruthy();
  });
});
