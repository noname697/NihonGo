import { Card } from "./Card";

export const StatCard = ({ icon: Icon, title, value, description }) => {
  return (
    <Card>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
            {title}
          </p>

          <strong className="mt-2 block text-3xl font-black text-zinc-950 dark:text-white">
            {value}
          </strong>

          {description && (
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              {description}
            </p>
          )}
        </div>

        {Icon && (
          <div className="rounded-2xl bg-red-50 p-3 text-nihon-red dark:bg-red-950/30 dark:text-sakura">
            <Icon size={22} />
          </div>
        )}
      </div>
    </Card>
  );
};
