import { CheckCircle2, Circle } from "lucide-react";
import { Link } from "react-router";

export const LessonCard = ({ lesson }) => {
  const progress = lesson.userProgress?.[0];
  const isCompleted = Boolean(progress?.is_completed);

  return (
    <Link
      to={`/lessons/${lesson.id}`}
      className="block rounded-3xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-1 hover:border-red-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-red-950"
    >
      <div className="flex items-center gap-4">
        <div className="mt-1 text-nihon-red">
          {isCompleted ? <CheckCircle2 size={22} /> : <Circle size={22} />}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-black text-zinc-950 dark:text-white">
                {lesson.title}
              </h3>

              <p className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                {lesson.description ||
                  "Study this lesson and complete its exercises."}
              </p>
            </div>

            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
              #{lesson.position}
            </span>
          </div>

          {progress && (
            <p className="mt-3 text-sm font-semibold text-nihon-red">
              Score: {Number(progress.score || 0).toFixed(2)}%
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
