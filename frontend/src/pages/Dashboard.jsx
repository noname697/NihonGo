import ContinueLearningCard from "../components/dashboard/ContinueLearningCard";
import DailyGoalCard from "../components/dashboard/DailyGoalCard";
import QuickStats from "../components/dashboard/QuickStats";
import RecentActivityCard from "../components/dashboard/RecentActivityCard";
import RecommendedLessons from "../components/dashboard/RecommendedLessons";
import { useDashboard } from "../hooks/useDashboard";

export const Dashboard = () => {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <span className="text-zinc-500">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-8">
      <ContinueLearningCard lesson={data.continueLearning} />

      <QuickStats stats={data.quickStats} />

      <section className="grid">
        <DailyGoalCard />

        <RecentActivityCard />
      </section>

      <RecommendedLessons />
    </main>
  );
};
