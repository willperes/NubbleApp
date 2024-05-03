import { Post } from "@domain";

export const mockedPost: Post = {
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
