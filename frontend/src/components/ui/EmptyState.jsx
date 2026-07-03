export const EmptyState = ({ title, description }) => {
  return (
    <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-xl font-black text-zinc-950 dark:text-white">
        {title}
      </h2>

      {description && (
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      )}
    </div>
  );
};
