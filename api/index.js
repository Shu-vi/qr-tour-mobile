import axios from "axios";

const $host = axios.create({
  baseURL: "http://192.168.0.104:5002",
});

export { $host };
