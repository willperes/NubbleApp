import { Post, postService } from "@domain";
import { usePaginatedList } from "@infra";

export function useListPosts() {
  return usePaginatedList<Post>(postService.getList);
}
