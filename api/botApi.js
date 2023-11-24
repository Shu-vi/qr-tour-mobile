import { $host } from "./index";

export const sendMessage = async (message, id) => {
  const { data } = await $host.post("/qa", {
    data: message,
    id,
  });
  return data;
};

export const getDescription = async (id) => {
  const { data } = await $host.post("/", {
    id,
  });
  return data;
};
