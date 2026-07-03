import clsx from "clsx";

export const Card = ({ children, className }) => {
  return (
    <section
      className={clsx(
        "rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900",
        className,
      )}
    >
      {children}
    </section>
  );
};
