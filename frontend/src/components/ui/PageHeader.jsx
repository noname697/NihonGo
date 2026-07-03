export const PageHeader = ({ eyebrow, title, description, action }) => {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        {eyebrow && (
          <span className="rounded-full bg-sakura-soft px-3 py-1 text-sm font-bold text-nihon-red">
            {eyebrow}
          </span>
        )}

        <h1 className="mt-4 text-4xl font-black tracking-tight text-zinc-950 dark:text-white">
          {title}
        </h1>

        {description && (
          <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-300">
            {description}
          </p>
        )}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
};
