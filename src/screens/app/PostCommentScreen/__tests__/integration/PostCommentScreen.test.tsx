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
  fireEvent,
  renderScreen,
  screen,
  waitForElementToBeRemoved,
} from "test-utils";

import { PostCommentScreen } from "../../PostCommentScreen";

describe("Integration: PostCommentScreen", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
    resetPostCommentInMemoryResponse();
  });

  afterAll(() => {
    server.close();
    jest.resetAllMocks();
  });

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

    // Check if the list has two comments
    const postCommentItems = await screen.findAllByTestId(/PostCommentItem-/i);
    expect(postCommentItems.length).toBe(2);

    // Find the comment input element and type the new comment
    const commentInputElement = screen.getByPlaceholderText(
      "Adicione um comentário",
    );
    fireEvent.changeText(commentInputElement, "Novo comentário");

    // Find the create comment button and press it to create the new comment
    const createCommentButtonElement = screen.getByText("Enviar");
    fireEvent.press(createCommentButtonElement);

    // Check if the new comment was created
    const newPostCommentElement = await screen.findByText(/Novo comentário/i);
    expect(newPostCommentElement).toBeTruthy();

    // Check if the list has three comments
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

    // Check if the list has two comments
    const postCommentItems = await screen.findAllByTestId(/PostCommentItem-/i);
    expect(postCommentItems.length).toBe(2);

    // Check if the comment to be removed is in the list
    const commentToRemoveElement = await screen.findByText(
      postCommentMocks.authUserPostCommentAPI.message,
      { exact: false },
    );
    expect(commentToRemoveElement).toBeTruthy();

    // Long press the comment to open the deletion alert
    fireEvent(commentToRemoveElement, "longPress");
    expect(mockedAlert).toHaveBeenCalled();

    // Press confirm on the alert
    mockedConfirm && mockedConfirm();

    await waitForElementToBeRemoved(() =>
      screen.getByText(postCommentMocks.authUserPostCommentAPI.message, {
        exact: false,
      }),
    );

    // Check if the list has only one comment
    const updatedPostCommentItems = await screen.findAllByTestId(
      /PostCommentItem-/i,
    );
    expect(updatedPostCommentItems.length).toBe(1);
  });
});
