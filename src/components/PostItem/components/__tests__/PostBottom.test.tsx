import React from "react";

import { Post } from "@domain";
import { render, screen } from "test-utils";

import { PostBottom } from "../PostBottom";

const mockedPost: Post = {
  id: 1,
  imageURL: "fake-url",
  commentCount: 3,
  favoriteCount: 2,
  reactionCount: 3,
  text: "This is the text (post description)",
  author: {
    id: 2,
    name: "Willian Peres",
    profileURL: "https://example.com",
    userName: "willperes",
  },
};

describe("<PostBottom />", () => {
  describe("comments link text", () => {
    it("should hide the comments link text if post has no comments", () => {
      render(<PostBottom {...mockedPost} commentCount={0} />);

      const commentLinkElement = screen.queryByText(/comentário/);
      expect(commentLinkElement).toBeFalsy();
    });

    it("should show the comments link text in singular if post has 1 comment", () => {
      render(<PostBottom {...mockedPost} commentCount={1} />);

      const commentLinkElement = screen.getByText("ver 1 comentário");
      expect(commentLinkElement).toBeTruthy();
    });

    it("should show the comments link text in plural if post has 2 or more comments", () => {
      render(<PostBottom {...mockedPost} commentCount={2} />);

      const commentLinkElement = screen.getByText("ver 2 comentários");
      expect(commentLinkElement).toBeTruthy();
    });
  });
});
