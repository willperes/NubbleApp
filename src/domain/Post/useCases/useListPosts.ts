import { useEffect, useState } from "react";

import { Post, postService } from "@domain";

export function useListPosts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [postList, setPostList] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchInitialData(): Promise<void> {
    try {
      setLoading(true);
      setError(false);

      const { data, meta } = await postService.getList(1);
      setPostList(data);

      if (meta.hasNextPage) {
        setPage(2);
        setHasNextPage(true);
      } else {
        setHasNextPage(false);
      }
    } catch (err) {
      console.error("ERRO", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  async function fetchNextPage() {
    if (loading || !hasNextPage) {
      return;
    }

    try {
      setLoading(true);

      const { data, meta } = await postService.getList(page);
      setPostList(prev => prev.concat(data));

      if (meta.hasNextPage) {
        setPage(prev => prev + 1);
      } else {
        setHasNextPage(false);
      }
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    postList,
    error,
    refresh: fetchInitialData,
    fetchNextPage,
  };
}
