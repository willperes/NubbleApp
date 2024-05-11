import React from "react";

import { server } from "@test";
import { renderScreen, screen } from "test-utils";

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

describe("integration: PostCommentScreen", () => {
  it("should update the comment list when a new comment was created", async () => {
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

    const postCommentElement = await screen.findByText(
      /Comentário aleatório do post/i,
    );
    expect(postCommentElement).toBeTruthy();
  });
});
