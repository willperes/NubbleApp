import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:3333/",
  headers: {
    Authorization:
      "Bearer Ng.4w4pZ8OFK2Q7f5PzzCmqQdlcrmX3u__HBwB76Ho_rSSgfw8Zf3gh2-XtYYW6",
  },
});
