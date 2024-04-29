import { MMKV } from "react-native-mmkv";

import { Storage } from "../storage";

const mmkvInstance = new MMKV();
export const mmkvStorage: Storage = {
  getItem: key => {
    const item = mmkvInstance.getString(key);
    if (!item) {
      return null;
    }

    return JSON.parse(item);
  },
  setItem: async (key, value) => {
    mmkvInstance.set(key, JSON.stringify(value));
  },
  removeItem: async key => {
    mmkvInstance.delete(key);
  },
};
