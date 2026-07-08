import QuickStats from "../components/dashboard/QuickStats";
import { useAuth } from "../contexts/AuthContext";
import { useDashboard } from "../hooks/useDashboard";

export const Dashboard = () => {
  const { user } = useAuth();

  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <span className="text-zinc-500">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <QuickStats stats={data.quickStats} />
    </div>
  );
};
