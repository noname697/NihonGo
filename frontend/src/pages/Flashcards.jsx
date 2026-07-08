import { useEffect, useMemo, useState } from "react";
import {
  createDeck,
  getDecks,
  getDueCards,
  getFlashcardProgress,
  reviewCard,
} from "../api/flashcard.api";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";
import { PageHeader } from "../components/ui/PageHeader";
import { LoadingState } from "../components/ui/LoadingState";
import { SubmitButton } from "../components/ui/SubmitButton";
import { EmptyState } from "../components/ui/EmptyState";

const Flashcards = () => {
  const [decks, setDecks] = useState([]);
  const [deckTitle, setDeckTitle] = useState("");
  const [deckDescription, setDeckDescription] = useState("");

  const [dueCards, setDueCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const [progress, setProgress] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentCard = useMemo(
    () => dueCards[currentIndex] || null,
    [dueCards, currentIndex],
  );

  const loadAll = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const [decksData, dueData, progressData] = await Promise.all([
        getDecks(),
        getDueCards({ limit: 20 }),
        getFlashcardProgress(),
      ]);

      setDecks(decksData.decks || []);
      setDueCards(dueData.cards || []);
      setProgress(progressData || []);
      setCurrentIndex(0);
      setShowAnswer(false);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const onCreateDeck = async (event) => {
    event.preventDefault();
    if (!deckTitle.trim()) return;

    try {
      setError(null);

      await createDeck({
        title: deckTitle.trim(),
        description: deckDescription.trim() || null,
        is_public: false,
      });

      setDeckTitle("");
      setDeckDescription("");
      await loadAll();
    } catch (error) {
      setError(getApiErrorMessage(error));
    }
  };

  const onReview = async (isCorrect) => {
    if (!currentCard) return;

    try {
      setError(null);

      await reviewCard(currentCard.id, isCorrect);

      const isLast = currentIndex >= dueCards.length - 1;
      if (isLast) {
        await loadAll();
      } else {
        setCurrentIndex((prev) => prev + 1);
        setShowAnswer(false);
      }
    } catch (error) {
      setError(getApiErrorMessage(error));
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

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

      {isLoading ? (
        <LoadingState message="Loading flashcards..." />
      ) : (
        <>
          <section className="rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-black text-zinc-950 dark:text-white">
              Create deck
            </h2>

            <form
              onSubmit={onCreateDeck}
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
              <SubmitButton
                loadingText="Creating..."
                disabled={!deckTitle.trim()}
              >
                Create deck
              </SubmitButton>
            </form>

            <div className="mt-4">
              {decks.length === 0 ? (
                <EmptyState
                  title="No decks"
                  description="Create your first deck above."
                />
              ) : (
                <div className="grid gap-2">
                  {decks.map((deck) => (
                    <div
                      key={deck.id}
                      className="rounded-xl border border-zinc-200 px-4 py-3 dark:border-zinc-800"
                    >
                      <p className="font-bold">{deck.title}</p>
                      <p className="text-sm">{deck.cards_count} cards</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="mt-6 rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-black text-zinc-950 dark:text-white">
              Due review
            </h2>

            {!currentCard ? (
              <EmptyState
                title="No pending cards"
                description="You are up to date with your review."
              />
            ) : (
              <div className="mt-4">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Card {currentIndex + 1} of {dueCards.length}
                </p>

                <div className="mt-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950">
                  <p className="text-xs font-bold text-zinc-500">
                    {currentCard.deck?.title}
                  </p>
                  <p className="mt-2 text-2xl font-black">
                    {currentCard.front_text}
                  </p>

                  {showAnswer && (
                    <p className="mt-4 text-lg text-nihon-red">
                      {currentCard.back_text}
                    </p>
                  )}

                  {!showAnswer ? (
                    <button
                      type="button"
                      onClick={() => setShowAnswer(true)}
                      className="mt-5 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-bold text-white hover:bg-zinc-700"
                    >
                      Show answer
                    </button>
                  ) : (
                    <div className="mt-5 flex gap-3">
                      <button
                        type="button"
                        onClick={() => onReview(true)}
                        className="rounded-xl bg-green-600 px-4 py-2  text-sm font-bold text-white hover:bg-green-700"
                      >
                        I got it
                      </button>
                      <button
                        type="button"
                        onClick={() => onReview(false)}
                        className="rounded-xl bg-red-600 px-4 py-2  text-sm font-bold text-white hover:bg-red-700"
                      >
                        I missed
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>

          <section className="mt-6 rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-black text-zinc-950 dark:text-white">
              Review progress
            </h2>

            {progress.length === 0 ? (
              <EmptyState
                title="No progress yet"
                description="Review cards to generate progress."
              />
            ) : (
              <div className="mt-4 grid gap-2">
                {progress.slice(0, 10).map((item) => (
                  <div
                    key={item.flashcard_id}
                    className="rounded-xl border border-zinc-200 px-4 py-3 dark:border-zinc-800"
                  >
                    <p className=" font-bold">{item.flashcard?.front_text}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Mastery: {Number(item.mastery_score || 0).toFixed(2)}% |
                      Reviews: {item.review_count}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default Flashcards;
