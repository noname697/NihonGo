import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getLessonById, getLessonExercises } from "../api/content.api";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";
import { LoadingState } from "../components/ui/LoadingState";
import { ErrorState } from "../components/ui/ErrorState";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { ExercisePreview } from "../components/features/modules/ExercisePreview";

export const LessonDetails = () => {
  const { id } = useParams();

  const [lesson, setLesson] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadLesson = async () => {
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
  };

  useEffect(() => {
    loadLesson();
  }, [id]);

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

      <PageHeader eyebrow={lesson?.module?.level} />
      <section className="rounded-4xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-xl font-black text-zinc-950 dark:text-white">
          Lesson explanation
        </h2>

        <p className="mt-4 whitespace-pre-line leading-8 text-zinc-600 dark:text-zinc-300">
          {lesson?.explanation_text}
        </p>
      </section>

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
            <ExercisePreview key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </section>
    </div>
  );
};
