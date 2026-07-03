export const ErrorState = ({
  title = "Something went wrong",
  message,
  onRetry,
}) => {
  return (
    <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-800 dark:border-red-950 dark:bg-red-950/40 dark:text-red-200">
      <h2 className="text-xl font-black">{title}</h2>

      {message && <p className="mt-2 text-sm">{message}</p>}

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 rounded-full bg-nihon-red px-5 py-3 text-sm font-bold text-white transition hover:bg-nihon-red-dark"
        >
          Try again
        </button>
      )}
    </div>
  );
};
