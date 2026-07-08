import api from "../api/api";

export const getDashboard = async () => {
  const { data } = await api.get("/api/dashboard/v2");

  return data;
};
