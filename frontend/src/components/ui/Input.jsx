export const Input = ({ label, id, error, ...props }) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-semibold text-zinc-800 dark:text-zinc-200"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-nihon-red focus:ring-4 focus:ring-red-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-sakura dark:focus:ring-rose-950"
        {...props}
      />

      {error && (
        <p className="mt-2 text-sm font-medium text-nihon-red">{error}</p>
      )}
    </div>
  );
};
