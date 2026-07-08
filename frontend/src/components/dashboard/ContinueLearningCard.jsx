import { Link } from "react-router";
import { ProgressBar } from "../ui/ProgressBar";

const ContinueLearningCard = ({ lesson }) => {
  if (!lesson) {
    return (
      <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
          Continue Learning
        </h2>

        <p className="mt-3 text-zinc-500 dark:text-zinc-400">
          You haven't started any lessons yet.
        </p>

        <Link
          to="/modules"
          className="mt-6 inline-flex rounded-xl bg-nihon-red px-5 py-3 font-medium text-white transition hover:bg-red-700"
        >
          Browse Modules
        </Link>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <p className="text-sm font-medium uppercase tracking-wide text-nihon-red">
        Continue Learning
      </p>

      <h2 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
        {lesson.module} • {lesson.title}
      </h2>

      <div className="mt-6">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-zinc-500">Progress</span>

          <span className="font-medium">{lesson.progress}%</span>
        </div>

        <ProgressBar value={lesson.progress} />
      </div>

      <Link
        to={`/lessons/${lesson.lessonId}`}
        className="mt-8 inline-flex rounded-xl bg-nihon-red px-5 py-3 font-medium text-white transition hover:bg-red-700"
      >
        Continue Learning
      </Link>
    </section>
  );
};

export default ContinueLearningCard;
