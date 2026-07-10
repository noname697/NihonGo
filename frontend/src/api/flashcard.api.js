import api from "./api";

export const getDecks = async () => {
  const response = await api.get("/api/flashcards/decks");
  return response.data;
};

export const getDeckById = async (id) => {
  const response = await api.get(`/api/flashcards/decks/${id}`);
  return response.data;
};

export const createDeck = async (payload) => {
  const response = await api.post("/api/flashcards/decks", payload);
  return response.data;
};

export const updateDeck = async (id, payload) => {
  const response = await api.put(`/api/flashcards/decks/${id}`, payload);
  return response.data;
};

export const deleteDeck = async (id) => {
  const response = await api.delete(`/api/flashcards/decks/${id}`);
  return response.data;
};

export const createCard = async (deckId, payload) => {
  const response = await api.post(
    `/api/flashcards/decks/${deckId}/cards`,
    payload,
  );
  return response.data;
};

export const updateCard = async (deckId, payload) => {
  const response = await api.put(`/api/flashcards/cards/${deckId}`, payload);
  return response.data;
};

export const deleteCard = async (deckId) => {
  const response = await api.delete(`/api/flashcards/cards/${deckId}`);
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
