import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";

import { ArrowLeft } from "lucide-react";
import { getModuleProgress } from "../api/progress.api";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

import { LoadingState } from "../components/ui/LoadingState";
import { ErrorState } from "../components/ui/ErrorState";
import { PageHeader } from "../components/ui/PageHeader";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { ProgressBar } from "../components/ui/ProgressBar";
import { LessonList } from "../components/features/modules/LessonList";

export const ModuleDetails = () => {
    const { id } = useParams();

  const [moduleData, setModuleData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadModule = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getModuleProgress(id);

      setModuleData(data.module);
      setSummary(data.summary);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadModule();
  }, [id]);

  const progressPercentage = useMemo(() => {
    return Number(summary?.progress_percentage || 0);
  }, [summary]);

  if (isLoading) {
    return <LoadingState message="Loading module..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Could not load module"
        message={error}
        onRetry={loadModule}
      />
    );
  }

  return (
    <div>
      <Link
        to="/modules"
        className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-zinc-500 transition hover:text-nihon-red dark:text-zinc-400"
      >
        <ArrowLeft size={16} />
        Back to modules
      </Link>

      <PageHeader
        eyebrow={moduleData?.level}
        title={moduleData?.title}
        description={moduleData?.description}
      />

      <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_320px]">
        <Card>
          <div className="flex items-start justify-between gap-4">
            <div>
              <Badge variant="red">Progress</Badge>

              <h2 className="mt-4 text-2xl font-black text-zinc-950 dark:text-white">
                Module overview
              </h2>

              <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                Complete the lessons and exercises to finish this module.
              </p>
            </div>

            <strong className="text-3xl font-black text-nihon-red">
              {progressPercentage.toFixed(0)}%
            </strong>
          </div>

          <div className="mt-6">
            <ProgressBar value={progressPercentage} />
          </div>
        </Card>

        <Card>
          <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
            Lessons completed
          </p>

          <strong className="mt-2 block text-4xl font-black tetx-zinc-950 dark:text-white">
            {summary?.completed_lessons || 0}/{summary?.total_lessons || 0}
          </strong>

          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Keep going one lesson at time.
          </p>
        </Card>
      </div>

      <LessonList lessons={moduleData?.lessons || []} />
    </div>
  );
};
