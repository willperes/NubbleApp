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

interface PaginatedListOptions {
  /**
   * Set this to `false` to disable automatic refetching when the query mounts or changes query keys.
   */
  enabled: boolean;

  /**
   * The time in milliseconds after data is considered stale. If set to `Infinity`,
   * the data will never be considered stale.
   * @example 5 * 60 * 1000 // 5 minutes
   */
  staleTime: number;
}

export function usePaginatedList<TData>(
  queryKey: readonly unknown[],
  getList: (page: number) => Promise<Page<TData>>,
  options?: PaginatedListOptions,
): UsePaginatedListResult<TData> {
  const [list, setList] = useState<TData[]>([]);

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) => getList(pageParam),
    getNextPageParam: ({ meta }) =>
      meta.hasNextPage ? meta.currentPage + 1 : undefined,
    enabled: options?.enabled,
    staleTime: options?.staleTime,
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
