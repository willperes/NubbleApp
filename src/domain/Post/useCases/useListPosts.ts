import { useEffect, useState } from "react";

import { Post, postService } from "@domain";

export function useListPosts() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [postList, setPostList] = useState<Post[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchData(): Promise<void> {
    try {
      setIsLoading(true);
      setError(false);

      const list = await postService.getList(page);
      setPage(prev => prev + 1);
      setPostList(prev => prev.concat(list));
    } catch (err) {
      console.error("ERRO", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  function fetchNextPage() {
    if (!isLoading) {
      fetchData();
    }
  }

  return {
    isLoading,
    postList,
    error,
    refetch: fetchData,
    fetchNextPage,
  };
}
