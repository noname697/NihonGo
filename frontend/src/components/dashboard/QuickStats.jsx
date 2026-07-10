import StatCard from "../ui/StatCard";

const QuickStats = ({ stats }) => {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => (
        <StatCard key={stat.id} title={stat.label} value={stat.value} />
      ))}
    </section>
  );
};

export default QuickStats;
