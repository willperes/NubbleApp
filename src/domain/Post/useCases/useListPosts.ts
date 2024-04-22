import { useEffect, useState } from "react";

import { postService } from "../postService";
import { Post } from "../postTypes";

export function useListPosts() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [postList, setPostList] = useState<Post[]>([]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchData(): Promise<void> {
    try {
      setIsLoading(true);
      setError(false);

      const list = await postService.getList();
      setPostList(list);
    } catch (err) {
      console.error("ERRO", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    postList,
    error,
    refetch: fetchData,
  };
}
