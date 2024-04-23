import { useEffect, useState } from "react";

import { Page } from "@types";

export function usePaginatedList<Data>(
  getList: (page: number) => Promise<Page<Data>>,
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [list, setList] = useState<Data[]>([]);
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

      const { data, meta } = await getList(1);
      setList(data);

      if (meta.hasNextPage) {
        setPage(2);
        setHasNextPage(true);
      } else {
        setHasNextPage(false);
      }
    } catch (err) {
      console.error("ERRO", err);
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

      const { data, meta } = await getList(page);
      setList(prev => prev.concat(data));

      if (meta.hasNextPage) {
        setPage(prev => prev + 1);
        setHasNextPage(true);
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
    list,
    loading,
    error,
    refresh: fetchInitialData,
    fetchNextPage,
  };
}
