import { useEffect, useState } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Page } from "@types";

interface UsePaginatedListResult<TData> {
  list: TData[];
  isError: boolean;
  isLoading: boolean;
  isRefetching: boolean;
  hasNextPage: boolean;
  refetch: () => void;
  fetchNextPage: () => void;
}

export function usePaginatedList<TData>(
  queryKey: readonly unknown[],
  getList: (page: number) => Promise<Page<TData>>,
): UsePaginatedListResult<TData> {
  const [list, setList] = useState<TData[]>([]);

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) => getList(pageParam),
    getNextPageParam: ({ meta }) =>
      meta.hasNextPage ? meta.currentPage + 1 : undefined,
  });

  useEffect(() => {
    if (query.data) {
      const newList = query.data.pages.reduce<TData[]>(
        (acc, page) => acc.concat(page.data),
        [],
      );

      setList(newList);
    }
  }, [query.data]);

  return {
    list,
    isLoading: query.isLoading,
    isRefetching: query.isRefetching,
    isError: query.isError,
    hasNextPage: !!query.hasNextPage,
    refetch: query.refetch,
    fetchNextPage: query.fetchNextPage,
  };
}
