import React from "react";
import { Alert, AlertButton } from "react-native";

import { authCredentialsStorage } from "@services";
import {
  authMocks,
  postCommentMocks,
  resetPostCommentInMemoryResponse,
  server,
} from "@test";
import {
  act,
  fireEvent,
  renderScreen,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "test-utils";

import { PostCommentScreen } from "../../PostCommentScreen";

beforeAll(() => {
  server.listen();
  jest.useFakeTimers();
});

afterEach(() => {
  server.resetHandlers();
  resetPostCommentInMemoryResponse();
});

afterAll(() => {
  server.close();
  jest.resetAllMocks();
  jest.useRealTimers();
});

describe("Integration: PostCommentScreen", () => {
  test("Creating a new comment: the list should be updated when a new comment was created", async () => {
    renderScreen(
      <PostCommentScreen
        navigation={{} as any}
        route={{
          name: "PostCommentScreen",
          key: "PostCommentScreen",
          params: {
            postId: postCommentMocks.POST_ID,
            postAuthorId: postCommentMocks.authUserPostCommentAPI.user_id,
          },
        }}
      />,
    );

    // 1) Check if the list has two comments
    const postCommentItems = await screen.findAllByTestId(/PostCommentItem-/i);
    expect(postCommentItems.length).toBe(2);

    // 2) Find the comment input element and type the new comment
    const commentInputElement = screen.getByPlaceholderText(
      "Adicione um comentário",
    );
    fireEvent.changeText(commentInputElement, "Novo comentário");

    // 3) Find the create comment button and press it to create the new comment
    const createCommentButtonElement = screen.getByText("Enviar");
    fireEvent(createCommentButtonElement, "press");

    // 4) Check if the new comment was created
    const newPostCommentElement = await screen.findByText(/Novo comentário/i);
    expect(newPostCommentElement).toBeTruthy();

    // 5) Check if the list has three comments
    const updatedPostCommentItems = await screen.findAllByTestId(
      /PostCommentItem-/i,
    );
    expect(updatedPostCommentItems.length).toBe(3);
  });

  test("Deleting a comment: the list should be updated when a comment was deleted", async () => {
    jest
      .spyOn(authCredentialsStorage, "get")
      .mockResolvedValue(authMocks.authCredentials);

    let mockedConfirm: AlertButton["onPress"];
    const mockedAlert = jest
      .spyOn(Alert, "alert")
      .mockImplementation((title, message, buttons) => {
        if (buttons && buttons[0].onPress) {
          mockedConfirm = buttons[0].onPress;
        }
      });

    renderScreen(
      <PostCommentScreen
        navigation={{} as any}
        route={{
          name: "PostCommentScreen",
          key: "PostCommentScreen",
          params: {
            postId: postCommentMocks.POST_ID,
            postAuthorId: postCommentMocks.authUserPostCommentAPI.user_id,
          },
        }}
      />,
    );

    // 1) Check if the list has two comments
    const postCommentItems = await screen.findAllByTestId(/PostCommentItem-/i);
    expect(postCommentItems.length).toBe(2);

    // 2) Check if the comment to be removed is in the list
    const commentToRemoveElement = await screen.findByText(
      postCommentMocks.authUserPostCommentAPI.message,
      { exact: false },
    );
    expect(commentToRemoveElement).toBeTruthy();

    // 3) Long press the comment to open the deletion alert
    fireEvent(commentToRemoveElement, "longPress");
    expect(mockedAlert).toHaveBeenCalled();

    // 4) Press confirm on the alert
    mockedConfirm && mockedConfirm();

    await waitForElementToBeRemoved(() =>
      screen.getByText(postCommentMocks.authUserPostCommentAPI.message, {
        exact: false,
      }),
    );

    // 5) Check if the list has only one comment
    const updatedPostCommentItems = await screen.findAllByTestId(
      /PostCommentItem-/i,
    );
    expect(updatedPostCommentItems.length).toBe(1);

    // 6) Check that the Toast message informing the comment deletion was shown
    await waitFor(() => expect(screen.getByTestId("Toast")).toBeTruthy());
    // TODO: fix deprecated warning
    // https://stackoverflow.com/questions/78438525/jest-tells-me-to-use-act-but-then-ide-indicates-it-is-deprecated-what-is-best
    act(() => jest.runAllTimers());

    // 7) Check that the Toast message was removed
    expect(screen.queryByTestId("Toast")).toBeNull();
  });
});
