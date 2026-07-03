import api from "./api";

export const getOverallProgress = async () => {
  const response = await api.get("/api/progress/overview");
  return response.data;
};

export const getModuleProgress = async (id) => {
  const response = await api.get(`/api/progress/modules/${id}`);
  return response.data;
};

export const getLessonProgress = async (id) => {
  const response = await api.get(`/api/progress/lessons/${id}`);
  return response.data;
};

export const answerExercise = async (id, answer) => {
  const response = await api.post(`/api/progress/exercises/${id}/answer`, {
    answer,
  });
  return response.data;
};
