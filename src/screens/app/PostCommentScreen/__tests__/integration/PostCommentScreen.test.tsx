import React from "react";

import { renderScreen } from "test-utils";

import { PostCommentScreen } from "../../PostCommentScreen";

describe("integration: PostCommentScreen", () => {
  it("should update the comment list when a new comment was created", () => {
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
  });
});
