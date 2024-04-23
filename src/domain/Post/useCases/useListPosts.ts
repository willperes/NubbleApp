import { Post, postService, usePaginatedList } from "@domain";

export function useListPosts() {
  return usePaginatedList<Post>(postService.getList);
}
