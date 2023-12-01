import axios from "axios";

export const sendMessage = async (message, id, ip) => {
  const { data } = await axios.post("http://" + ip + ":5002/qa", {
    data: message,
    id,
  });
  return data;
};

export const getDescription = async (id, ip) => {
  const { data } = await axios.post("http://" + ip + ":5002/", {
    id,
  });
  return data;
};
