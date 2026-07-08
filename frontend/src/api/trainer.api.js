import api from "./api";

export const getRandomCharacters = async (params = {}) => {
  const response = await api.get("/api/trainer/characters/random", { params });
  return response.data;
};

export const answerCharacter = async (id, answer) => {
  const response = await api.post(`/api/trainer/characters/${id}/answer`, {
    answer,
  });

  return response.data;
};

export const getTrainerProgress = async (params = {}) => {
  const response = await api.get("/api/trainer/progress", { params });

  return response.data;
};
