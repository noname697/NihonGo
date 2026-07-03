import api from "./api";

export const getModules = async () => {
  const response = await api.get("/api/content/modules");
  return response.data;
};

export const getModuleById = async (id) => {
  const response = await api.get(`/api/content/modules/${id}`);
  return response.data;
};

export const getLessonById = async (id) => {
  const response = await api.get(`/api/content/lessons/${id}`);
  return response.data;
};

export const getLessonExercises = async (id) => {
  const response = await api.get(`/api/content/lessons/${id}/exercises`);
  return response.data;
};
