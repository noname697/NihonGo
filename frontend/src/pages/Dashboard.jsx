import { Card } from "../components/ui/Card";
import { ProgressBar } from "../components/ui/ProgressBar";

export const Dashboard = () => {
  return (
    <div>
      <h1 className="">Dashboard</h1>
      <p className="">Your learning summary will appear here.</p>
      <Card>oi</Card>
      <ProgressBar value={50} />
    </div>
  );
};
