import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import { ArrowLeft } from "lucide-react";
import { getLessonById, getLessonExercises } from "../api/content.api";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

import { InteractiveExerciseCard } from "../components/features/modules/InteractiveExerciseCard";
import { ErrorState } from "../components/ui/ErrorState";
import { LoadingState } from "../components/ui/LoadingState";
import { PageHeader } from "../components/ui/PageHeader";

const LessonDetails = () => {
  const { id } = useParams();

  const [lesson, setLesson] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [lastLessonProgress, setLastLessonProgress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getLessonProgressFromResponse = (data) => {
    return data?.lesson_progress ?? data?.progress ?? null;
  };

  const loadLesson = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [lessonData, exerciseData] = await Promise.all([
        getLessonById(id),
        getLessonExercises(id),
      ]);

      setLesson(lessonData.lesson);
      setExercises(exerciseData.exercises || []);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadLesson();
  }, [loadLesson]);

  if (isLoading) {
    return <LoadingState message="Loading lesson..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Could not load lesson"
        message={error}
        onRetry={loadLesson}
      />
    );
  }

  return (
    <div>
      <Link
        to={lesson?.module_id ? `/modules/${lesson.module_id}` : "/modules"}
        className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-zinc-500 transition hover:text-nihon-red dark:text-zinc-400"
      >
        <ArrowLeft size={16} />
        Back to module
      </Link>

      <PageHeader
        eyebrow={lesson?.module?.level}
        title={lesson?.title}
        description={lesson?.description}
      />
      <section className="rounded-4xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-xl font-black text-zinc-950 dark:text-white">
          Lesson explanation
        </h2>

        <p className="mt-4 whitespace-pre-line leading-8 text-zinc-600 dark:text-zinc-300">
          {lesson?.explanation_text}
        </p>
      </section>

      {lastLessonProgress && (
        <div className="mt-6 rounded-3xl border border-red-100 bg-red-50 p-5 dark:border-red-950 dark:bg-red-950/30">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-bold text-nihon-red">
                Current lesson progress
              </p>

              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                {lastLessonProgress.correct_exercises} of{" "}
                {lastLessonProgress.total_exercises} exercises correct.
              </p>
            </div>

            <strong className="text-2xl font-black text-nihon-red">
              {Number(lastLessonProgress.score || 0).toFixed(0)}%
            </strong>
          </div>
        </div>
      )}

      <section className="mt-8">
        <div className="mb-5">
          <h2 className="text-2xl font-black text-zinc-950 dark:text-white">
            Exercises
          </h2>

          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Practice what you learned this lesson.
          </p>
        </div>

        <div className="grid gap-4">
          {exercises.map((exercise) => (
            <InteractiveExerciseCard
              key={exercise.id}
              exercise={exercise}
              onAnswered={(data) =>
                setLastLessonProgress(getLessonProgressFromResponse(data))
              }
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default LessonDetails;
