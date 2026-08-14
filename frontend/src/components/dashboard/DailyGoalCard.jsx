import { ProgressBar } from "../ui/ProgressBar";

const DailyGoalCard = ({ goal }) => {
  const safeGoal = goal || {
    target: 5,
    completed: 0,
    progress: 0,
    items: [],
  };

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Daily Goal
          </h2>

          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            You completed {safeGoal.completed} of {safeGoal.target} learning
            actions today.
          </p>
        </div>

        <strong className="text-2xl font-black text-nihon-red">
          {safeGoal.completed}/{safeGoal.target}
        </strong>
      </div>

      <div className="mt-5">
        <ProgressBar value={safeGoal.progress} />
      </div>

      <div className="mt-5 grid gap-2">
        {safeGoal.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl bg-zinc-50 px-3 py-2 text-sm dark:bg-zinc-950"
          >
            <span className="text-zinc-500 dark:text-zinc-400">
              {item.label}
            </span>
            <strong className="text-zinc-950 dark:text-white">
              {item.value}
            </strong>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DailyGoalCard;
