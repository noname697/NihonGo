import api from "../api";

export const getDasboard = async () => {
  const { data } = await api.get("/dashboard/v2");

  return data;
};
