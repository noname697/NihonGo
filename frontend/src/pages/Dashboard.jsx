import { GraduationCap } from "lucide-react";
import { ProgressBar } from "../components/ui/ProgressBar";
import { StatCard } from "../components/ui/StatCard";

export const Dashboard = () => {
  return (
    <div>
      <h1 className="">Dashboard</h1>
      <p className="">Your learning summary will appear here.</p>
      <StatCard
        title="fesfs"
        description="grge"
        icon={GraduationCap}
        value={5}
      />
      <ProgressBar value={50} />
    </div>
  );
};
