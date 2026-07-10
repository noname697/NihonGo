import { useEffect, useMemo, useState } from "react";
import {
  answerCharacter,
  getRandomCharacters,
  getTrainerProgress,
} from "../api/trainer.api";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";
import { PageHeader } from "../components/ui/PageHeader";
import { EmptyState } from "../components/ui/EmptyState";
import { LoadingState } from "../components/ui/LoadingState";
import { SubmitButton } from "../components/ui/SubmitButton";
import { CheckCircle, XCircle } from "lucide-react";

const Trainer = () => {
  const [type, setType] = useState("hiragana");
  const [jlptLevel, setJlptLevel] = useState("");
  const [limit, setLimit] = useState(10);

  const [characters, setCharacters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [lastResult, setLastResult] = useState(null);

  const [progress, setProgress] = useState([]);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const [isLoadingPractice, setIsLoadingPractice] = useState(false);
  const [error, setError] = useState(null);

  const currentCharacter = useMemo(() => {
    return characters[currentIndex] || null;
  }, [characters, currentIndex]);

  const loadProgress = async () => {
    try {
      setIsLoadingProgress(true);
      const params = { type };
      if (jlptLevel) params.jlpt_level = jlptLevel;

      const data = await getTrainerProgress(params);
      setProgress(data.progress || []);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsLoadingProgress(false);
    }
  };

  const startPractice = async () => {
    try {
      setError(null);
      setIsLoadingPractice(true);

      const params = { type, limit: Number(limit) || 10 };
      if (jlptLevel) params.jlpt_level = jlptLevel;

      const data = await getRandomCharacters(params);

      setCharacters(data.characters || []);
      setCurrentIndex(0);
      setTypedAnswer("");
      setLastResult(null);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsLoadingPractice(false);
    }
  };

  const submitAnswer = async (event) => {
    event.preventDefault();

    if (!currentCharacter || !typedAnswer.trim()) return;

    try {
      setError(null);

      const data = await answerCharacter(
        currentCharacter.id,
        typedAnswer.trim(),
      );
      setLastResult(data);
      await loadProgress();
    } catch (error) {
      setError(getApiErrorMessage(error));
    }
  };

  const goNext = () => {
    setTypedAnswer("");
    setLastResult(null);
    setCurrentIndex((prev) => prev + 1);
  };

  useEffect(() => {
    loadProgress();
  }, [type, jlptLevel]);

  return (
    <div>
      <PageHeader
        eyebrow="Practice"
        title="Kana / Kanji Trainer"
        description="Practice Hiragana, Katakana and Kanji with immediate feedback"
      />

      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-950 dark:bg-red-950/40 dark:text-red-200">
          {error}
        </div>
      )}

      <section className="rounded-3xl border border-zinc-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-950 dark:bg-red-950/40 dark:text-red-200">
        <h2 className="text-lg font-black text-zinc-950 dark:text-white">
          Settings
        </h2>

        <div className="mt-4 grid gap-4 md:grid-cols-4">
          <select
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-950"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="hiragana">Hiragana</option>
            <option value="katakana">Katakana</option>
            <option value="kanji">Kanji</option>
          </select>
          <select
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-950"
            value={jlptLevel}
            onChange={(e) => setJlptLevel(e.target.value)}
          >
            <option value="">Without JLPT filter</option>
            <option value="N5">N5</option>
            <option value="N4">N4</option>
            <option value="N3">N3</option>
            <option value="N2">N2</option>
            <option value="N1">N1</option>
          </select>

          <input
            type="number"
            min={1}
            max={50}
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-950"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />

          <button
            type="button"
            onClick={startPractice}
            className="rounded-xl bg-nihon-red px-4 py-2 font-bold text-white hover:bg-nihon-red-dark"
          >
            {isLoadingPractice ? "Loading..." : "Start practice"}
          </button>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        {!currentCharacter && !isLoadingPractice && (
          <EmptyState
            title="No exercises loaded"
            description="Click 'Start practice' to begin."
          />
        )}

        {isLoadingPractice && <LoadingState message="Loading characters..." />}

        {currentCharacter && !isLoadingPractice && (
          <>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Item {currentIndex + 1} de {characters.length}
            </p>

            <div className="mt-3 text-6xl font-black text-nihon-red">
              {currentCharacter.symbol}
            </div>

            <form onSubmit={submitAnswer} className="mt-5 space-y-4">
              <input
                className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm dark:border-zinc-800 dark:bg-zinc-950"
                placeholder="Type your answer..."
                value={typedAnswer}
                onChange={(e) => setTypedAnswer(e.target.value)}
              />

              <SubmitButton
                loadingText="Checking..."
                disabled={!typedAnswer.trim()}
              >
                Submit answer
              </SubmitButton>
            </form>

            {lastResult && (
              <div className="mt-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <p className="flex items-center gap-2 font-bold">
                  {lastResult.result?.is_correct ? (
                    <CheckCircle size={18} className="text-green-600" />
                  ) : (
                    <XCircle size={18} className="text-red-600" />
                  )}
                  {lastResult.result?.is_correct ? "Correct" : "Incorrect"}
                </p>
                {!lastResult.result?.is_correct && (
                  <p className="mt-2 text-sm ">
                    Accepted answers: romaji "
                    {lastResult.character?.romaji || "-"}", meaning "
                    {lastResult.character?.meaning || "-"}"
                  </p>
                )}
                <p className="mt-2 text-sm">
                  Mastery:{" "}
                  {Number(lastResult.progress?.mastery_score || 0).toFixed(2)}%
                </p>

                {currentIndex < characters.length - 1 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="mt-4 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-bold text-white hover:bg-zinc-700"
                  >
                    Next
                  </button>
                ) : (
                  <p className="mt-4 text-sm font-semibold text-green-600">
                    Practice completed.
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </section>

      <section className="mt-6 rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-black text-zinc-950 dark:text-white">
          My progress
        </h2>

        {isLoadingProgress ? (
          <LoadingState message="Loading progress..." />
        ) : progress.length === 0 ? (
          <EmptyState
            title="No progress yet."
            description="Answer some items to see your statistics."
          />
        ) : (
          <div className="mt-4 grid gap-3">
            {progress.slice(0, 10).map((item) => (
              <div
                key={item.character_id}
                className="rounded-xl border border-zinc-200 px-4 py-3 dark:border-zinc-800"
              >
                <p className="font-bold">
                  {item.character?.symbol}{" "}
                  {item.character?.romaji ? `(${item.character.romaji})` : ""}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Correct: {item.correct_attempts} | Wrong:{" "}
                  {item.wrong_attempts} | Mastery:{" "}
                  {Number(item.mastery_score || 0).toFixed(2)}%
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Trainer;
