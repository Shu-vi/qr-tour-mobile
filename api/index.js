import axios from "axios";

const $host = axios.create({
  baseURL: "http://x.x.x.x:5002",
});

export { $host };
