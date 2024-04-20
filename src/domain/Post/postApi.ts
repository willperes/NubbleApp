import { postListMock } from "./postListMock";
import { Post } from "./types";

async function getList(): Promise<Post[]> {
  return new Promise(resolve => setTimeout(() => resolve(postListMock), 250));
}

export const postApi = {
  getList,
};
