import clsx from "clsx";

const variants = {
  red: "bg-red-50 text-nihon-red dark:bg-red-950/40 dark:text-sakura",
  zinc: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200",
  rose: "bg-sakura-soft text-nihon-red dark:bg-red-950/40 dark:text-sakura",
};

export const Badge = ({ children, variant = "zinc", className }) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
};
