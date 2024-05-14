import React from "react";

import { authCredentialsStorage } from "@services";
import { authMocks, server, userMocks } from "@test";
import { act, fireEvent, renderScreen, screen } from "test-utils";

import { AppStack } from "@routes";

jest.unmock("@react-navigation/native");

beforeAll(() => {
  server.listen();
  jest.useFakeTimers();
  jest
    .spyOn(authCredentialsStorage, "get")
    .mockResolvedValue(authMocks.authCredentials);
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
  jest.useRealTimers();
  jest.resetAllMocks();
});

describe("Integration: SearchScreen", () => {
  test("Search user flow", async () => {
    // 1) Render app stack with SearchScreen as initial route
    renderScreen(<AppStack initialRouteName={"SearchScreen"} />);

    // 2) Find the search input and type the search query
    const searchInputElement = screen.getByPlaceholderText("Digite sua busca");
    fireEvent.changeText(searchInputElement, "mar");
    // TODO: fix deprecated warning
    // https://stackoverflow.com/questions/78438525/jest-tells-me-to-use-act-but-then-ide-indicates-it-is-deprecated-what-is-best
    act(() => jest.runAllTimers());

    // 3) Check if the search results were displayed
    const authUserElement = await screen.findByText(
      userMocks.authUserAPI.username,
    );
    expect(authUserElement).toBeTruthy();

    const userElement = await screen.findByText(userMocks.userAPI.username);
    expect(userElement).toBeTruthy();

    // 4) Click on the auth user to navigate to the ProfileScreen
    fireEvent.press(authUserElement);

    // 5) Verify that the ProfileScreen was displayed with the auth user data
    const authUserFullNameElement = await screen.findByText(
      userMocks.authUserAPI.full_name,
    );
    expect(authUserFullNameElement).toBeTruthy();

    // 6) Identify the go back button and press it to go back to the SearchScreen
    const goBackButtonElement = screen.getByText("Voltar");
    fireEvent.press(goBackButtonElement);

    // 7) Clear the search input
    const searchInputElementAfterBack =
      screen.getByPlaceholderText("Digite sua busca");
    fireEvent.changeText(searchInputElementAfterBack, "");

    // 8) Verify that the search history was displayed
    const searchHistoryTitleElement = screen.getByText("Buscas recentes");
    expect(searchHistoryTitleElement).toBeTruthy();

    // 9) Verify that the auth user pressed previously appears in the search history
    const authUserHistoryElement = screen.queryByText(
      userMocks.authUserAPI.username,
    );
    expect(authUserHistoryElement).toBeTruthy();

    // 10) The user that was not pressed should not appear in the search history
    const userHistoryElement = screen.queryByText(userMocks.userAPI.username);
    expect(userHistoryElement).toBeNull();

    // 11) Should remove the auth user from the search history
    const trashIconElement = screen.getByTestId("Icon-trash");
    fireEvent.press(trashIconElement);

    // 12) Verify that the auth user was removed from the search history
    const authUserAfterRemoveElement = screen.queryByText(
      userMocks.authUserAPI.username,
    );
    expect(authUserAfterRemoveElement).toBeNull();
  });
});
