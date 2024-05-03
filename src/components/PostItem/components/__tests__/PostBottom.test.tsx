import React from "react";

import { fireEvent, render, screen } from "test-utils";

import { PostBottom } from "../PostBottom";

import { mockedPost } from "./mockedData/mockedPost";

const mockedNavigate = jest.fn();
jest.mock("@react-navigation/native", () => {
  const originalModule = jest.requireActual("@react-navigation/native");

  return {
    ...originalModule,
    useNavigation: () => ({
      ...originalModule.useNavigation,
      navigate: mockedNavigate,
    }),
  };
});

describe("<PostBottom />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show the post text and author username", () => {
    render(<PostBottom {...mockedPost} />);

    const textElement = screen.getByText(mockedPost.text);
    const authorUsernameElement = screen.getByText(mockedPost.author.userName);

    expect(textElement).toBeTruthy();
    expect(authorUsernameElement).toBeTruthy();
  });

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

    it("should navigate to PostCommentScreen when comments link text is pressed", () => {
      render(<PostBottom {...mockedPost} commentCount={2} />);

      const commentLinkElement = screen.getByText("ver 2 comentários");
      fireEvent.press(commentLinkElement);

      expect(mockedNavigate).toHaveBeenCalledWith("PostCommentScreen", {
        postId: mockedPost.id,
        postAuthorId: mockedPost.author.id,
      });
    });
  });
});
