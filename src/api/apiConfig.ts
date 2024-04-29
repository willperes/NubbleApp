import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:3333/",
  headers: {
    Authorization:
      "Bearer MQ.0nBh6X1XXE-YttNkFKBw-QxMsw2dvKVqOuatCVEpZi3ra9pzbbMYwnGWWjga",
  },
});
