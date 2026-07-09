import api from "./api";

export const getDecks = async () => {
  const response = await api.get("/api/flashcards/decks");
  return response.data;
};

export const createDeck = async (payload) => {
  const response = await api.post("/api/flashcards/decks", payload);
  return response.data;
};

export const createCard = async (deckId, payload) => {
  const response = await api.post(
    `/api/flashcards/decks/${deckId}/cards`,
    payload,
  );
  return response.data;
};

export const getDueCards = async (params = {}) => {
  const response = await api.get("/api/flashcards/due", { params });
  return response.data;
};

export const reviewCard = async (id, isCorrect) => {
  const response = await api.post(`/api/flashcards/cards/${id}/review`, {
    is_correct: isCorrect,
  });
  return response.data;
};

export const getFlashcardProgress = async () => {
  const response = await api.get("/api/flashcards/progress");
  return response.data;
};
