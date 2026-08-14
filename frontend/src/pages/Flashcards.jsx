import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createCard,
  createDeck,
  deleteCard,
  deleteDeck,
  getDeckById,
  getDecks,
  getDueCards,
  getFlashcardProgress,
  reviewCard,
  updateCard,
  updateDeck,
} from "../api/flashcard.api";
import { EmptyState } from "../components/ui/EmptyState";
import { LoadingState } from "../components/ui/LoadingState";
import { PageHeader } from "../components/ui/PageHeader";
import { SubmitButton } from "../components/ui/SubmitButton";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

const parseProgress = (data) => {
  return data?.progress || [];
};

const Flashcards = () => {
  const [decks, setDecks] = useState([]);
  const [dueCards, setDueCards] = useState([]);
  const [progress, setProgress] = useState([]);

  const [selectedDeckId, setSelectedDeckId] = useState("");
  const [deckTitle, setDeckTitle] = useState("");
  const [deckDescription, setDeckDescription] = useState("");

  const [selectedDeck, setSelectedDeck] = useState(null);
  const [isLoadingDeck, setIsLoadingDeck] = useState(false);

  const [editingDeckTitle, setEditingDeckTitle] = useState("");
  const [editingDeckDescription, setEditingDeckDescription] = useState("");

  const [editingCardId, setEditingCardId] = useState(null);
  const [editingCardFrontText, setEditingCardFrontText] = useState("");
  const [editingCardBackText, setEditingCardBackText] = useState("");
  const [editingCardExampleSentence, setEditingCardExampleSentence] =
    useState("");
  const [editingCardNotes, setEditingCardNotes] = useState("");

  const [newCardDeckId, setNewCardDeckId] = useState("");
  const [cardFrontText, setCardFrontText] = useState("");
  const [cardBackText, setCardBackText] = useState("");
  const [cardExampleSentence, setCardExampleSentence] = useState("");
  const [cardNotes, setCardNotes] = useState("");

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewSessionStats, setReviewSessionStats] = useState({
    reviewed: 0,
    remembered: 0,
    missed: 0,
  });

  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isCreatingDeck, setIsCreatingDeck] = useState(false);
  const [isCreatingCard, setIsCreatingCard] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [error, setError] = useState(null);

  const currentCard = useMemo(
    () => dueCards[currentCardIndex] || null,
    [dueCards, currentCardIndex],
  );

  const hasReviewedThisSession = reviewSessionStats.reviewed > 0;
  const reviewAccuracy =
    reviewSessionStats.reviewed > 0
      ? Math.round(
          (reviewSessionStats.remembered / reviewSessionStats.reviewed) * 100,
        )
      : 0;

  const loadDecks = useCallback(async () => {
    const data = await getDecks();
    const nextDecks = data?.decks || [];
    setDecks(nextDecks);

    if (!newCardDeckId && nextDecks.length > 0) {
      setNewCardDeckId(String(nextDecks[0].id));
    }

    return nextDecks;
  }, [newCardDeckId]);

  const loadSelectedDeck = async (deckId) => {
    if (!deckId) {
      setSelectedDeck(null);
      return;
    }

    try {
      setIsLoadingDeck(true);
      setError(null);

      const data = await getDeckById(deckId);

      setSelectedDeck(data.deck);
      setEditingDeckTitle(data.deck.title || "");
      setEditingDeckDescription(data.deck.description || "");
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsLoadingDeck(false);
    }
  };

  const loadDueCards = useCallback(async (deckId) => {
    const data = await getDueCards(
      deckId ? { deck_id: deckId, limit: 50 } : { limit: 50 },
    );
    const cards = data?.cards || [];
    setDueCards(cards);
    setCurrentCardIndex(0);
    setShowAnswer(false);
  }, []);

  const loadProgress = useCallback(async () => {
    const data = await getFlashcardProgress();
    setProgress(parseProgress(data));
  }, []);

  const loadPageData = useCallback(async () => {
    try {
      setIsLoadingPage(true);
      setError(null);

      await Promise.all([
        loadDecks(),
        loadDueCards(selectedDeckId),
        loadProgress(),
      ]);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsLoadingPage(false);
    }
  }, [loadDecks, loadDueCards, loadProgress, selectedDeckId]);

  useEffect(() => {
    loadPageData();
  }, [loadPageData]);

  useEffect(() => {
    if (isLoadingPage) return;

    const syncDueCards = async () => {
      try {
        await loadDueCards(selectedDeckId);
      } catch (error) {
        setError(getApiErrorMessage(error));
      }
    };

    syncDueCards();
  }, [isLoadingPage, loadDueCards, selectedDeckId]);

  const handleCreateDeck = async (event) => {
    event.preventDefault();

    try {
      setIsCreatingDeck(true);
      setError(null);

      await createDeck({
        title: deckTitle,
        description: deckDescription || null,
        is_public: false,
      });

      setDeckTitle("");
      setDeckDescription("");

      const nextDecks = await loadDecks();
      if (nextDecks.length > 0) {
        setSelectedDeckId((prev) => prev || String(nextDecks[0].id));
      }
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsCreatingDeck(false);
    }
  };

  const handleCreateCard = async (event) => {
    event.preventDefault();

    try {
      setIsCreatingCard(true);
      setError(null);

      await createCard(newCardDeckId, {
        front_text: cardFrontText,
        back_text: cardBackText,
        example_sentence: cardExampleSentence || null,
        notes: cardNotes || null,
      });

      setCardFrontText("");
      setCardBackText("");
      setCardExampleSentence("");
      setCardNotes("");

      await Promise.all([
        loadDecks(),
        loadDueCards(selectedDeckId),
        loadProgress(),
        selectedDeckId ? loadSelectedDeck(selectedDeckId) : Promise.resolve(),
      ]);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsCreatingCard(false);
    }
  };

  const resetReviewSession = () => {
    setReviewSessionStats({ reviewed: 0, remembered: 0, missed: 0 });
  };

  const handleReview = async (isCorrect) => {
    if (!currentCard) return;

    try {
      setIsReviewing(true);
      setError(null);

      await reviewCard(currentCard.id, isCorrect);

      setReviewSessionStats((prev) => ({
        reviewed: prev.reviewed + 1,
        remembered: prev.remembered + (isCorrect ? 1 : 0),
        missed: prev.missed + (isCorrect ? 0 : 1),
      }));

      await Promise.all([loadDueCards(selectedDeckId), loadProgress()]);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsReviewing(false);
    }
  };

  const handleUpdateDeck = async (event) => {
    event.preventDefault();

    if (!selectedDeck) return;

    try {
      setError(null);

      await updateDeck(selectedDeck.id, {
        title: editingDeckTitle,
        description: editingDeckDescription || null,
        is_public: selectedDeck.is_public,
      });

      await Promise.all([loadDecks(), loadSelectedDeck(selectedDeck.id)]);
    } catch (error) {
      setError(getApiErrorMessage(error));
    }
  };

  const handleDeleteDeck = async () => {
    if (!selectedDeck) return;

    const confirmed = window.confirm(
      `Delete "${selectedDeck.title}" and all its cards?`,
    );

    if (!confirmed) return;

    try {
      setError(null);

      await deleteDeck(selectedDeck.id);

      setSelectedDeck(null);
      setSelectedDeckId("");
      setNewCardDeckId("");

      await Promise.all([loadDecks(), loadDueCards(""), loadProgress()]);
    } catch (error) {
      setError(getApiErrorMessage(error));
    }
  };

  const handleUpdateCard = async (event) => {
    event.preventDefault();

    if (!editingCardId || !selectedDeck) return;

    try {
      setError(null);

      await updateCard(editingCardId, {
        front_text: editingCardFrontText,
        back_text: editingCardBackText,
        example_sentence: editingCardExampleSentence || null,
        notes: editingCardNotes || null,
      });

      cancelEditingCard();

      await Promise.all([
        loadSelectedDeck(selectedDeck.id),
        loadDueCards(selectedDeckId),
        loadProgress(),
      ]);
    } catch (error) {
      setError(getApiErrorMessage(error));
    }
  };

  const handleDeleteCard = async (card) => {
    if (!selectedDeck) return;

    const confirmed = window.confirm(`Delete card "${card.front_text}"?`);

    if (!confirmed || !selectedDeck) return;

    try {
      setError(null);

      await deleteCard(card.id);

      if (editingCardId === card.id) {
        cancelEditingCard();
      }

      await Promise.all([
        loadSelectedDeck(selectedDeck.id),
        loadDecks(),
        loadDueCards(selectedDeckId),
        loadProgress(),
      ]);
    } catch (error) {
      setError(getApiErrorMessage(error));
    }
  };

  const startEditingCard = (card) => {
    setEditingCardId(card.id);
    setEditingCardFrontText(card.front_text || "");
    setEditingCardBackText(card.back_text || "");
    setEditingCardExampleSentence(card.example_sentence || "");
    setEditingCardNotes(card.notes || "");
  };

  const cancelEditingCard = () => {
    setEditingCardId(null);
    setEditingCardFrontText("");
    setEditingCardBackText("");
    setEditingCardExampleSentence("");
    setEditingCardNotes("");
  };

  // Render

  if (isLoadingPage) {
    return <LoadingState message="Loading flashcards..." />;
  }

  return (
    <div>
      <PageHeader
        eyebrow="Review"
        title="Flashcards"
        description="Create decks and review pending cards with spaced repetition."
      />

      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-950 dark:bg-red-950/40 dark:text-red-200">
          {error}
        </div>
      )}

      <section className="rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-black text-zinc-950 dark:text-white">
          Create deck
        </h2>

        <form
          onSubmit={handleCreateDeck}
          className="mt-4 grid gap-3 md:grid-cols-3"
        >
          <input
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-950"
            placeholder="Deck title"
            value={deckTitle}
            onChange={(e) => setDeckTitle(e.target.value)}
          />
          <input
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-950"
            placeholder="Description (optional)"
            value={deckDescription}
            onChange={(e) => setDeckDescription(e.target.value)}
          />
          <SubmitButton loadingText="Creating..." disabled={isCreatingDeck}>
            Create deck
          </SubmitButton>
        </form>

        <div className="mt-4 space-y-2">
          {decks.map((deck) => (
            <button
              key={deck.id}
              type="button"
              onClick={() => {
                const nextDeckId = String(deck.id);
                resetReviewSession();
                setSelectedDeckId(nextDeckId);
                loadSelectedDeck(nextDeckId);
              }}
              className={`block w-full rounded-xl border px-4 py-3 text-left transition ${String(deck.id) === selectedDeckId ? "border-nihon-red bg-red-50 dark:border-red-900 dark:bg-red-950/30" : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"}`}
            >
              <p className="font-bold text-zinc-950 dark:text-white">
                {deck.title}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {deck.cards_count} cards
              </p>
            </button>
          ))}

          {decks.length === 0 && (
            <EmptyState
              title="No decks yet"
              description="Create your first deck."
            />
          )}
        </div>

        {selectedDeck && (
          <form onSubmit={handleUpdateDeck} className="mt-5 space-y-3">
            <h3 className="font-black">Edit selected deck</h3>

            <input
              value={editingDeckTitle}
              onChange={(e) => setEditingDeckTitle(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
              placeholder="Deck title"
              required
            />

            <input
              value={editingDeckDescription}
              onChange={(e) => setEditingDeckDescription(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
              placeholder="Description"
            />

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-zinc-700"
              >
                Save deck
              </button>
              <button
                type="button"
                onClick={handleDeleteDeck}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-700"
              >
                Delete deck
              </button>
            </div>
          </form>
        )}
      </section>

      <section className="mt-6 rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-xl font-black text-zinc-950 dark:text-white">
          Add card
        </h2>

        {decks.length === 0 ? (
          <EmptyState
            title="Create a deck first"
            description="You need at least one deck to add cards."
          />
        ) : (
          <form onSubmit={handleCreateCard} className="mt-4 space-y-3">
            <select
              value={newCardDeckId}
              onChange={(event) => setNewCardDeckId(event.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
              required
            >
              {decks.map((deck) => (
                <option key={deck.id} value={deck.id}>
                  {deck.title}
                </option>
              ))}
            </select>

            <input
              value={cardFrontText}
              onChange={(event) => setCardFrontText(event.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
              placeholder="Front text (question)"
              required
            />

            <input
              value={cardBackText}
              onChange={(event) => setCardBackText(event.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
              placeholder="Back text (answer)"
              required
            />

            <input
              value={cardExampleSentence}
              onChange={(event) => setCardExampleSentence(event.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
              placeholder="Example sentence (optional)"
            />

            <input
              value={cardNotes}
              onChange={(event) => setCardNotes(event.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
              placeholder="Notes (optional)"
            />

            <SubmitButton
              loadingText="Creating card..."
              disabled={isCreatingCard}
            >
              Add Card
            </SubmitButton>
          </form>
        )}
      </section>

      <section className="mt-6 rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-xl font-black text-zinc-950 dark:text-white">
          Selected deck cards
        </h2>
        {!selectedDeck ? (
          <EmptyState
            title="No deck selected"
            description="Choose a deck to view and manage its cards."
          />
        ) : isLoadingDeck ? (
          <LoadingState message="Loading deck cards..." />
        ) : selectedDeck.cards?.length > 0 ? (
          <div className="mt-4 grid gap-3">
            {selectedDeck.cards.map((card) => (
              <div
                key={card.id}
                className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800"
              >
                {editingCardId === card.id ? (
                  <form onSubmit={handleUpdateCard} className="space-y-3">
                    <input
                      value={editingCardFrontText}
                      onChange={(e) => setEditingCardFrontText(e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                      placeholder="Front text"
                      required
                    />

                    <input
                      value={editingCardBackText}
                      onChange={(e) => setEditingCardBackText(e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                      placeholder="Back text"
                      required
                    />

                    <input
                      value={editingCardExampleSentence}
                      onChange={(e) =>
                        setEditingCardExampleSentence(e.target.value)
                      }
                      className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                      placeholder="Example sentence"
                    />

                    <input
                      value={editingCardNotes}
                      onChange={(e) => setEditingCardNotes(e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                      placeholder="Notes"
                    />

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="submit"
                        className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-zinc-700"
                      >
                        Save card
                      </button>
                      <button
                        type="button"
                        onClick={cancelEditingCard}
                        className="rounded-xl bg-zinc-100 px-4 py-2 text-sm font-bold text-zinc-700 transition hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <p className="text-sm font-bold uppercase text-nihon-red">
                      Front
                    </p>
                    <p className="mt-1 text-lg font-black text-zinc-950 dark:text-white">
                      {card.front_text}
                    </p>
                    <p className="mt-3 text-sm font-bold uppercase text-zinc-500">
                      Back
                    </p>
                    <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                      {card.back_text}
                    </p>
                    {card.example_sentence && (
                      <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                        Example: {card.example_sentence}
                      </p>
                    )}
                    {card.notes && (
                      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        Notes: {card.notes}
                      </p>
                    )}

                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => startEditingCard(card)}
                        className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-zinc-700"
                      >
                        Edit card
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCard(card)}
                        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-700"
                      >
                        Delete card
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No cards in this deck"
            description="Add your first card using the form above."
          />
        )}
      </section>

      <section className="mt-6 rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-black text-zinc-950 dark:text-white">
          Due review
        </h2>

        {currentCard ? (
          <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Card {currentCardIndex + 1} of {dueCards.length}
            </p>
            <p className="mt-2 text-2xl font-black text-zinc-950 dark:text-white">
              {currentCard.front_text}
            </p>

            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Deck: {currentCard.deck?.title || "Untitled deck"}
            </p>

            {showAnswer && (
              <div className="mt-4 space-y-3">
                <p className="text-lg font-bold text-nihon-red">
                  {currentCard.back_text}
                </p>

                {currentCard.example_sentence && (
                  <p className="rounded-xl bg-white px-4 py-3 text-sm text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
                    Example: {currentCard.example_sentence}
                  </p>
                )}

                {currentCard.notes && (
                  <p className="rounded-xl bg-white px-4 py-4 text-sm text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
                    Notes: {currentCard.notes}
                  </p>
                )}
              </div>
            )}

            <div className="mt-5 flex flex-wrap gap-3">
              {!showAnswer ? (
                <button
                  type="button"
                  onClick={() => setShowAnswer(true)}
                  className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-950 dark:hover:bg-white"
                >
                  Show answer
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    disabled={isReviewing}
                    onClick={() => handleReview(true)}
                    className="rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isReviewing ? "Saving..." : "I got it"}
                  </button>
                  <button
                    type="button"
                    disabled={isReviewing}
                    onClick={() => handleReview(false)}
                    className="rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isReviewing ? "Saving..." : "I missed"}
                  </button>
                </>
              )}
            </div>
          </div>
        ) : hasReviewedThisSession ? (
          <div className="mt-4 rounded-2xl border border-green-200 bg-green-50 p-5 dark:border-green-950 dark:bg-green-950/30">
            <p className="text-sm font-bold uppercase text-green-700 dark:text-green-300">
              Review Completed
            </p>

            <h3 className="mt-2 text-2xl font-black text-zinc-950 dark:text-white">
              Nice work today
            </h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              <div className="rounded-xl bg-white p-4 dark:bg-zinc-900">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Reviewed
                </p>
                <p className="text-2xl font-black text-zinc-950 dark:text-white">
                  {reviewSessionStats.reviewed}
                </p>
              </div>
              <div className="rounded-xl bg-white p-4 dark:bg-zinc-900">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Missed
                </p>
                <p className="text-2xl font-black text-zinc-950 dark:text-white">
                  {reviewSessionStats.missed}
                </p>
              </div>
              <div className="rounded-xl bg-white p-4 dark:bg-zinc-900">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Accuracy
                </p>
                <p className="text-2xl font-black text-zinc-950 dark:text-white">
                  {reviewAccuracy}%
                </p>
              </div>
            </div>
          </div>
        ) : (
          <EmptyState
            title="No pending cards"
            description="Add cards to a deck. New cards will appear here for review."
          />
        )}
      </section>

      <section className="mt-6 rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-xl font-black text-zinc-950 dark:text-white">
          Review progress
        </h2>

        {progress.length > 0 ? (
          <div className="mt-4 space-y-2">
            {progress.slice(0, 10).map((item) => (
              <div
                key={`${item.flashcard_id}-${item.due_date}`}
                className="rounded-xl border border-zinc-200 px-4 py-3 dark:border-zinc-800"
              >
                <p className="font-bold text-zinc-950 dark:text-white">
                  {item.flashcard?.front_text || "Card"}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Mastery: {Number(item.mastery_score || 0).toFixed(2)}% •
                  Reviews: {item.review_count}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No progress yet"
            description="Review cards to generate progress."
          />
        )}
      </section>
    </div>
  );
};

export default Flashcards;
