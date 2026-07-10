import { Link } from "react-router";

const formatActivityDate = (value) => {
  if (!value) return "Recently";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
};

const RecentActivityCard = ({ activities = [] }) => {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
        Recent Activity
      </h2>

      {activities.length === 0 ? (
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Start a lesson, practice a character, or review a flashcard to see
          your activity here.
        </p>
      ) : (
        <div className="mt-4 grid gap-3">
          {activities.map((activity) => (
            <Link
              key={`${activity.type}-${activity.id}`}
              to={activity.action}
              className="rounded-xl border border-zinc-100 px-3 py-2 transition hover:border-red-200 hover:bg-red-50 dark:border-zinc-800 dark:hover:border-red-950 dark:hover:bg-red-950/30"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase text-nihon-red">
                    {activity.label}
                  </p>
                  <p className="mt-1 font-bold text-zinc-950 dark:text-white">
                    {activity.title}
                  </p>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    {activity.detail}
                  </p>
                </div>

                <span className="shrink-0 text-xs text-zinc-400">
                  {formatActivityDate(activity.occurredAt)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentActivityCard;
