import { Badge } from "../../ui/Badge";

export const ExercisePreview = ({ exercise }) => {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between gap-4">
        <Badge variant="zinc">{exercise.type}</Badge>

        <span className="text-xs font-bold text-zinc-400">
          Exercise #{exercise.position}
        </span>
      </div>

      <p className="text-lg font-bold text-zinc-950 dark:text-white">
        {exercise.question}
      </p>

      {exercise.options?.length > 0 && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {exercise.options.map((option) => (
            <div
              key={option.id}
              className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-semibold  text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"
            >
              {option.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// TODO: Adaptar esse componente para responder o exercise
