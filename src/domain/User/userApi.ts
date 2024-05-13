import { PageAPI, api } from "@api";

import { UserAPI } from "./userTypes";

const PATH = "users";

async function getById(user_id: string): Promise<UserAPI> {
  const { data } = await api.get<UserAPI>(`${PATH}/${user_id}`);
  return data;
}

async function getList(search: string): Promise<PageAPI<UserAPI>> {
  const { data } = await api.get<PageAPI<UserAPI>>(PATH, {
    params: { search },
  });
  return data;
}

export const userApi = {
  getById,
  getList,
};
