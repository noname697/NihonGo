import { ModuleCard } from "../components/features/modules/ModuleCard";

export const Modules = () => {
  return (
    <>
      <ModuleCard
        module={{
          level: "Beginner",
          title: "N5",
          description: "fiewnfuiewbfeuwyi",
          progress_percentage: 50,
        }}
        progress={50}
      />
    </>
  );
};
