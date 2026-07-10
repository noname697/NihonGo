import { Link } from "react-router";

const RecommendedLessons = ({ recommendation }) => {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
        Recommended Lessons
      </h2>

      {recommendation ? (
        <div className="mt-4 rounded-2xl bg-red-50 p-5 dark:bg-red-950/30">
          <p className="text-xs font-bold uppercase text-nihon-red">
            {recommendation.type}
          </p>

          <h3 className="mt-2 text-xl font-black text-zinc-950 dark:text-white">
            {recommendation.title}
          </h3>

          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            {recommendation.description}
          </p>

          <Link
            to={recommendation.action}
            className="mt-5 inline-flex rounded-xl bg-nihon-red px-4 py-2 text-sm font-bold text-white transition hover:bg-nihon-red-dark"
          >
            Study now
          </Link>
        </div>
      ) : (
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          You have completed every available lesson. Review flashcards or
          practice characters to keep momentum.
        </p>
      )}
    </section>
  );
};

export default RecommendedLessons;
