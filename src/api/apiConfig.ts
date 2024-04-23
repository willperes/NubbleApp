import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:3333/",
  headers: {
    Authorization:
      "Bearer MQ.YzCfzmQlc-PwDGtsEIP-taDbvYzdiIUOiZuYhfIDvX2tjRh3Xv3NQ6JOYAYZ",
  },
});
