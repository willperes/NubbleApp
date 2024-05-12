import React from "react";

import { server } from "@test";
import { fireEvent, renderScreen, screen } from "test-utils";

import { PostCommentScreen } from "../../PostCommentScreen";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe("Integration: PostCommentScreen", () => {
  test("Creating a new comment: the list should be updated when a new comment was created", async () => {
    renderScreen(
      <PostCommentScreen
        navigation={{} as any}
        route={{
          name: "PostCommentScreen",
          key: "PostCommentScreen",
          params: { postId: 1, postAuthorId: 1 },
        }}
      />,
    );

    // Check if the list has only one comment
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

    // Check if the list has two comments
    const updatedPostCommentItems = await screen.findAllByTestId(
      /PostCommentItem-/i,
    );
    expect(updatedPostCommentItems.length).toBe(3);
  });

  // test("Deleting a comment: the list should be updated when a comment was deleted", async () => {
  //   jest
  //     .spyOn(authCredentialsStorage, "get")
  //     .mockResolvedValue(authMocks.authCredentials);

  //   renderScreen(
  //     <PostCommentScreen
  //       navigation={{} as any}
  //       route={{
  //         name: "PostCommentScreen",
  //         key: "PostCommentScreen",
  //         params: { postId: 1, postAuthorId: 1 },
  //       }}
  //     />,
  //   );
  // });
});
