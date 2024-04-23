import { useEffect, useState } from "react";

import { Post, postService } from "@domain";

export function useListPosts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [postList, setPostList] = useState<Post[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchInitialData(): Promise<void> {
    try {
      setLoading(true);
      setError(false);

      const list = await postService.getList(1);
      setPostList(list);

      // TODO: validar se tem mais páginas
      setPage(2);
    } catch (err) {
      console.error("ERRO", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  async function fetchNextPage() {
    if (loading) {
      return;
    }

    try {
      setLoading(true);

      const list = await postService.getList(page);
      setPostList(prev => prev.concat(list));
      setPage(prev => prev + 1);
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
