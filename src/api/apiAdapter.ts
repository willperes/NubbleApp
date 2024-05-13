import { MetaDataPageAPI, PageAPI } from "@api";
import { MetaDataPage, Page } from "@types";

function toMetaDataPage(meta: MetaDataPageAPI): MetaDataPage {
  return {
    total: meta.total,
    perPage: meta.per_page,
    currentPage: meta.current_page,
    lastPage: meta.last_page,
    firstPage: meta.first_page,
    hasNextPage: !!meta.next_page_url,
    hasPreviousPage: !!meta.previous_page_url,
  };
}

function toPageModel<ApiType, ModelType>(
  pageAPI: PageAPI<ApiType>,
  modelAdapter: (data: ApiType) => ModelType,
): Page<ModelType> {
  return {
    data: pageAPI.data.map(modelAdapter),
    meta: toMetaDataPage(pageAPI.meta),
  };
}

export const apiAdapter = { toMetaDataPage, toPageModel };
