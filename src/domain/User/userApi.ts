import { PageAPI, api } from "@api";

import { UserAPI } from "./userTypes";

export const USER_PATH = "users";

async function getById(user_id: string): Promise<UserAPI> {
  const { data } = await api.get<UserAPI>(`${USER_PATH}/${user_id}`);
  return data;
}

async function getList(search: string): Promise<PageAPI<UserAPI>> {
  const { data } = await api.get<PageAPI<UserAPI>>(USER_PATH, {
    params: { search },
  });
  return data;
}

export const userApi = {
  getById,
  getList,
};
