import { useEffect, useState } from "react";
import { getOverallProgress } from "../api/progress.api";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";
import { LoadingState } from "../components/ui/LoadingState";
import { ErrorState } from "../components/ui/ErrorState";
import { PageHeader } from "../components/ui/PageHeader";
import { EmptyState } from "../components/ui/EmptyState";
import { ModuleCard } from "../components/features/modules/ModuleCard";

const Modules = () => {
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadModules = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getOverallProgress();

      setModules(data.progress || []);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadModules();
  }, []);

  if (isLoading) {
    return <LoadingState message="Loading modules..." />;
  }

  if (error) {
    return <ErrorState title="Could not load modules" message={error} />;
  }

  return (
    <div>
      <PageHeader
        eyebrow="JLPT Modules"
        title="Choose your learning path"
        description="Study Japanese step by step through JLPT levels, from beginner N5 to advanced N1."
      />
      {modules.length === 0 ? (
        <EmptyState
          title="No modules available"
          description="The backend did not return any modules yet."
        />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Modules;
