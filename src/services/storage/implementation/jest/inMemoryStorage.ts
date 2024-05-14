import { Storage } from "../../storage";

let storage: Record<string, any> = {};

export const inMemoryStorage: Storage = {
  getItem: jest.fn(key => {
    return storage[key] ?? null;
  }),
  removeItem: jest.fn(async key => {
    if (key in storage) {
      delete storage[key];
    }
  }),
  setItem: jest.fn(async (key, value) => {
    storage[key] = value;
  }),
};
