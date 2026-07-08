const StatCard = ({ stat }) => {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-2 text-3xl font-bold text-zinc-900 dark:text-white">
        {stat.value}
      </div>

      <p className="text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</p>
    </div>
  );
};

export default StatCard;
