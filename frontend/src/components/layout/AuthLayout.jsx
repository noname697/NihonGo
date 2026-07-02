import { Link } from "react-router";
import { ThemeToggle } from "./ThemeToggle";

export const AuthLayout = ({ title, subtitle, children, footer }) => {
  return (
    <div className="min-h-screen bg-paper-soft text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <header className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-nihon-red text-sm font-black text-white">
            日
          </div>

          <div>
            <strong className="block text-lg leading-none">NihonGo!</strong>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Learn Japanese
            </span>
          </div>
        </Link>

        <ThemeToggle />
      </header>

      <main className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-10 px-4 py-10 lg:grid-cols-[1fr_420px]">
        <section className="hidden lg:block">
          <span className="rounded-full bg-sakura-soft px-3 py-1 text-sm font-semibold text-nihon-red">
            English → Japanese
          </span>
          <h1 className="mt-6 max-w-2xl text-5xl font-black tracking-tight">
            Build your Japanese study routine with lessons, practice and review.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
            Study JLPT modules, practice kana and kanji, answer exercises ans
            review flashcards in one place.
          </p>

          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
            {["N5", "かな", "漢字"].map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-zinc-200 bg-white p-6 text-center text-3xl font-black text-nihon-red shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-4xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-black tracking-tight">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              {subtitle}
            </p>
          </div>
          {children}

          {footer && (
            <div className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
              {footer}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
