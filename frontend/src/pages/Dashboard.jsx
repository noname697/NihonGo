import { BookOpen, Brain, Layers, PlayCircle } from "lucide-react";
import ContinueLearningCard from "../components/dashboard/ContinueLearningCard";
import DailyGoalCard from "../components/dashboard/DailyGoalCard";
import QuickStats from "../components/dashboard/QuickStats";
import RecentActivityCard from "../components/dashboard/RecentActivityCard";
import RecommendedLessons from "../components/dashboard/RecommendedLessons";
import { ErrorState } from "../components/ui/ErrorState";
import { useDashboard } from "../hooks/useDashboard";
import { Link } from "react-router";

const Dashboard = () => {
  const { data, isLoading, error } = useDashboard();

  const quickActions = [
    {
      title: "Continue lessons",
      description: "Study structured JLPT lessons and complete exercises.",
      to: "/modules",
      icon: BookOpen,
    },
    {
      title: "Practice characters",
      description: "Train hiragana, katakana, and kanji recognition..",
      to: "/trainer",
      icon: Brain,
    },
    {
      title: "Review flashcards",
      description: "Review due cards and strengthen long-term memory.",
      to: "/flashcards",
      icon: Layers,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <span className="text-zinc-500">Loading dashboard...</span>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Could not load dashboard"
        message="Please try again in a moment."
      />
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-8">
      <ContinueLearningCard lesson={data?.continueLearning} />

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-bold uppercase text-nihon-red">
              Study now
            </p>

            <h2 className="mt-1 text-xl font-black text-zinc-950 dark:text-white">
              Choose your next action
            </h2>
          </div>

          <Link
            to={data?.recommendation?.action || "/modules"}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-nihon-red px-4 py-2 text-sm font-bold  text-white transition hover:bg-nihon-red-dark"
          >
            <PlayCircle size={18} /> Recommended
          </Link>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.to}
                to={action.to}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 transition hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-red-950 dark:hover:bg-red-950/30"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-nihon-red dark:bg-zinc-900">
                  <Icon size={20} />
                </div>

                <h3 className="mt-4 font-black text-zinc-950 dark:text-white">
                  {action.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">{action.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <QuickStats stats={data?.quickStats || []} />

      <section className="grid gap-5 lg:grid-cols-2">
        <DailyGoalCard goal={data?.dailyGoal} />

        <RecentActivityCard activities={data?.recentActivity || []} />
      </section>

      <RecommendedLessons recommendation={data?.recommendation} />
    </main>
  );
};

export default Dashboard;
