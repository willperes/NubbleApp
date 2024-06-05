import { useEffect, useState } from "react";

import { QueryKeys } from "@infra";
import { useInfiniteQuery } from "@tanstack/react-query";

import { multimediaService } from "./multimediaService";

export function useMultimediaGetPhotos(
  hasPermission: boolean,
  onInitialLoad?: (imageUri: string) => void,
) {
  const [list, setList] = useState<string[]>([]);

  const query = useInfiniteQuery({
    queryKey: [QueryKeys.CameraRollList],
    queryFn: ({ pageParam }) => multimediaService.getPhotos(pageParam),
    getNextPageParam: ({ cursor }) => cursor,
    onSuccess: pageData => {
      if (onInitialLoad && pageData.pages.length === 1) {
        onInitialLoad(pageData.pages[0].photoList[0]);
      }
    },
    enabled: hasPermission,
  });

  function fetchNextPage() {
    if (hasPermission) {
      query.fetchNextPage();
    }
  }

  useEffect(() => {
    if (query.data) {
      const newList = query.data.pages.reduce<string[]>(
        (acc, page) => [...acc, ...page.photoList],
        [],
      );

      setList(newList);
    }
  }, [query.data]);

  return {
    photoList: list,
    hasNextPage: query.hasNextPage,
    fetchNextPage,
  };
}
