import { Link } from "react-router";
import { Badge } from "../../ui/Badge";
import { Card } from "../../ui/Card";
import { ProgressBar } from "../../ui/ProgressBar";

export const ModuleCard = ({ module }) => {
  return (
    <Card className="transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <Badge variant="red">{module.level}</Badge>

          <h2 className="mt-4 text-2xl font-black text-zinc-950 dark:text-white">
            {module.title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
            {module.description || "Japanese learning module."}
          </p>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-2xl font-black text-nihon-red dark:bg-red-950/30 dark:text-sakura">
          日
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-zinc-600 dark:text-zinc-300">
            Progress
          </span>

          <span className="font-bold text-nihon-red">
            {Number(module.progress_percentage || 0).toFixed(0)}%
          </span>
        </div>

        <ProgressBar value={module.progress_percentage} />

        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          {module.completed_lessons || 0} of {module.total_lessons || 0} lessons
          completed
        </p>
      </div>

      <Link
        to={`/modules/${module.id}`}
        className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-nihon-red dark:bg-white dark:text-zinc-950 dark:hover:bg-sakura-soft"
      >
        Open module
      </Link>
    </Card>
  );
};
