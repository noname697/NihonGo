import ContinueLearningCard from "../components/dashboard/ContinueLearningCard";
import DailyGoalCard from "../components/dashboard/DailyGoalCard";
import QuickStats from "../components/dashboard/QuickStats";
import RecentActivityCard from "../components/dashboard/RecentActivityCard";
import RecommendedLessons from "../components/dashboard/RecommendedLessons";
import { ErrorState } from "../components/ui/ErrorState";
import { useDashboard } from "../hooks/useDashboard";

const Dashboard = () => {
  const { data, isLoading, error, refetch } = useDashboard();

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
        onRetry={refetch}
      />
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-8">
      <ContinueLearningCard lesson={data?.continueLearning} />

      <QuickStats stats={data?.quickStats || []} />

      <section className="grid gap-5 lg:grid-cols-2">
        <DailyGoalCard goal={data?.dailyGoal} />

        <RecentActivityCard activities={data?.recentActivity || []} />
      </section>

      <RecommendedLessons recommendations={data?.recommendation} />
    </main>
  );
};

export default Dashboard;
