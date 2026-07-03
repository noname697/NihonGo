export const LoadingState = ({ message = "Loading..." }) => {
  return (
    <div className="flex min-h-64 items-center justify-center rounded-3xl border border-zinc-200 bg-white p-8 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
      {message}
    </div>
  );
};
