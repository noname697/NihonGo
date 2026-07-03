import { useEffect, useMemo, useState } from "react";

import { ProgressBar } from "../components/ui/ProgressBar";
import { StatCard } from "../components/ui/StatCard";
import { Card } from "../components/ui/Card";

import { useAuth } from "../contexts/AuthContext";
import { getDashboardSummary } from "../api/dashboard.api";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

import {
  BookOpen,
  Brain,
  Flame,
  GraduationCap,
  Layers,
  RefreshCcw,
} from "lucide-react";

const formatPercentage = (value) => {
  return `${Number(value || 0).toFixed(0)}%`;
};

const formatDate = (date) => {
  if (!date) {
    return "No activity yet";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

const getGreeting = (name) => {
  const hour = new Date().getHours();

  if (hour < 12) {
    return `Good morning, ${name}`;
  } else if (hour < 18) {
    return `Good afternoon, ${name}`;
  }
  return `Good evening, ${name}`;
};

export const Dashboard = () => {
  const { user } = useAuth();

  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDashboard = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getDashboardSummary();

      setSummary(data.summary);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const nextModule = useMemo(() => {
    if (!summary?.modules_progress) {
      return null;
    }

    return (
      summary.modules_progress.find((module) => {
        return Number(module.progress_percentage) < 100;
      }) || summary.modules_progress[0]
    );
  }, [summary]);

  if (isLoading) {
    return (
      <div className="grid gap-6">
        <div className="h-36 animate-pulse rounded-3xl bg-zinc-200 dark:bg-zinc-900" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="h-32 animate-pulse rounded-3xl bg-zinc-200 dark:bg-zinc-900" />
          <div className="h-32 animate-pulse rounded-3xl bg-zinc-200 dark:bg-zinc-900" />
          <div className="h-32 animate-pulse rounded-3xl bg-zinc-200 dark:bg-zinc-900" />
          <div className="h-32 animate-pulse rounded-3xl bg-zinc-200 dark:bg-zinc-900" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <h1 className="text-2xl font-black text-zinc-950 dark:text-white">
          Could not load dashboard
        </h1>

        <p className="mt-2 text-zinc-600 dark:text-zinc-300">{error}</p>

        <button
          type="button"
          onClick={loadDashboard}
          className="mt-6 rounded-full bg-nihon-red px-5 py-3 text-sm font-bold text-white transition hover:bg-nihon-red-dark"
        >
          Try again
        </button>
      </Card>
    );
  }

  const lessonStats = summary?.lesson_stats || {};
  const exerciseStats = summary?.exercise_stats || {};
  const trainerStats = summary?.trainer_stats || {};
  const flashcardStats = summary?.flashcard_stats || {};
  const recentActivity = summary?.recent_activity || {};

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-4xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="grid gap-6 p-6 lg:grid-cols-[1fr_280px] lg:p-8">
          <div>
            <span className="rounded-full bg-sakura-soft px-3 py-1 text-sm font-bold text-nihon-red">
              Your study dashboard
            </span>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-zinc-950 dark:text-white">
              {getGreeting(user?.name || "learner")}
            </h1>
            <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-300">
              Track your Japanese learning progress, review flashcards and keep
              improving your kana, kanji and JLPT skills.
            </p>

            {nextModule && (
              <div className="mt-6 max-w-xl">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-zinc-950 dark:text-white">
                      Continue studying {nextModule.level}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {nextModule.completed_lessons} of{" "}
                      {nextModule.total_lessons} lessons completed
                    </p>
                  </div>

                  <strong className="text-sm text-nihon-red">
                    {formatPercentage(nextModule.progress_percentage)}
                  </strong>
                </div>

                <ProgressBar value={nextModule.progress_percentage} />
              </div>
            )}
          </div>

          <div className="flex min-h-52 items-center justify-center rounded-3xl bg-linear-to-br from-red-50 to-rose-100 text-7xl font-black text-nihon-red dark:from-zinc-950 dark:to-zinc-900">
            日本語
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={GraduationCap}
          title="Lessons completed"
          value={`${lessonStats.completed_lessons || 0}/${lessonStats.total_lessons || 0}`}
          description={`${formatPercentage(lessonStats.completion_percentage)} total completion`}
        />
        <StatCard
          icon={BookOpen}
          title="Exercise accuracy"
          value={formatPercentage(exerciseStats.accuracy_percentage)}
          description={`${exerciseStats.correct_exercises || 0} correct of ${exerciseStats.answered_exercises || 0} answered`}
        />
        <StatCard
          icon={Brain}
          title="Characters studied"
          value={`${trainerStats.studied_characters || 0}/${trainerStats.total_characters || 0}`}
          description={`${formatPercentage(trainerStats.average_mastery)} average mastery`}
        />
        <StatCard
          icon={Flame}
          title="Flashcards due"
          value={flashcardStats.due_cards || 0}
          description={`${flashcardStats.reviewed_cards || 0} cards reviewed`}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <Card>
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-zinc-950 dark:text-white">
                Module progress
              </h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Your progress across JLPT levels.
              </p>
            </div>

            <Layers className="text-nihon-red" size={22} />
          </div>

          <div className="space-y-5">
            {summary.modules_progress?.map((module) => (
              <div key={module.id}>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-zinc-950 dark:text-white">
                      {module.title}
                    </p>
                    <p className="tetx-sm text-zinc-500 dark:text-zinc-400">
                      {module.completed_lessons} of {module.total_lessons}{" "}
                      lessons completed
                    </p>
                  </div>

                  <span className="text-sm font-bold text-nihon-red">
                    {formatPercentage(module.progress_percentage)}
                  </span>
                </div>

                <ProgressBar value={module.progress_percentage} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-zinc-950 dark:text-white">
                Review summary
              </h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Flashcards and trainer performance.
              </p>
            </div>

            <RefreshCcw className="text-nihon-red" size={22} />
          </div>

          <div className="space-y-5">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                  Flashcard mastery
                </span>
                <span className="font-bold text-nihon-red">
                  {formatPercentage(flashcardStats.average_mastery)}
                </span>
              </div>
              <ProgressBar value={flashcardStats.average_mastery} />
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                  Trainer accuracy
                </span>
                <span className="font-bold text-nihon-red">
                  {formatPercentage(trainerStats.accuracy_percentage)}
                </span>
              </div>
              <ProgressBar value={trainerStats.accuracy_percentage} />
            </div>

            <div className="rounded-3xl bg-zinc-50 p-4 dark:bg-zinc-950">
              <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                Flashcard decks
              </p>
              <strong className="mt-1 block text-2xl font-black text-zinc-950 dark:text-white">
                {flashcardStats.total_decks || 0}
              </strong>
            </div>

            <div className="rounded-3xl bg-zinc-50 p-4 dark:bg-zinc-950">
              <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                Total flashcards
              </p>
              <strong className="mt-1 block text-2xl font-black text-zinc-950 dark:text-white">
                {flashcardStats.total_cards || 0}
              </strong>
            </div>
          </div>
        </Card>
      </section>

      <section className="grid gap-6  lg:grid-cols-3">
        <RecentLessons lessons={recentActivity.recent_lessons || []} />
        <RecentCharacters characters={recentActivity.recent_characters || []} />
        <RecentFlashcards flashcards={recentActivity.recent_flashcards || []} />
      </section>
    </div>
  );
};

const RecentLessons = ({ lessons }) => {
  return (
    <Card>
      <h2 className="text-lg font-black text-zinc-950 dark:text-white">
        Recent lessons
      </h2>

      <div className="mt-5 space-y-4">
        {lessons.length === 0 ? (
          <EmptyActivity text="No lessons studied yet." />
        ) : (
          lessons.map((item) => (
            <div
              key={item.lesson_id}
              className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-950"
            >
              <p className="font-bold text-zinc-950 dark:text-white">
                {item.lesson?.title || "Lesson"}
              </p>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Score: {formatPercentage(item.score)}
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                {formatDate(item.last_studied_at)}
              </p>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

const RecentCharacters = ({ characters }) => {
  return (
    <Card>
      <h2 className="text-lg font-black text-zinc-950 dark:text-white">
        Recent trainer
      </h2>

      <div className="mt-5 space-y-4">
        {characters.length === 0 ? (
          <EmptyActivity text="No characters practiced yet." />
        ) : (
          characters.map((item) => (
            <div
              key={item.character_id}
              className="flex items-center gap-4 rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-950"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl font-black text-nihon-red dark:bg-zinc-900">
                {item.character?.symbol}
              </div>
              <div>
                <p className="font-bold text-zinc-950 dark:text-white">
                  {item.last_result ? "Correct" : "Incorrect"}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Mastery: {formatPercentage(item.mastery_score)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

const RecentFlashcards = ({ flashcards }) => {
  return (
    <Card>
      <h2 className="text-lg font-black text-zinc-950 dark:text-white">
        Recent flashcards
      </h2>

      <div className="mt-5 space-y-4">
        {flashcards.length === 0 ? (
          <EmptyActivity text="No flashcards reviewed yet." />
        ) : (
          flashcards.map((item) => (
            <div
              key={item.flashcard_id}
              className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-950"
            >
              <p className="font-bold text-zinc-950 dark:text-white">
                {item.flashcard?.front_text}
              </p>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {item.flashcard?.back_text}
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                Next review: {formatDate(item.due_date)}
              </p>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

const EmptyActivity = ({ text }) => {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-200 p-4 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
      {text}
    </div>
  );
};
