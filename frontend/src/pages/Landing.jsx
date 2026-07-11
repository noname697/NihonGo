import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Languages,
} from "lucide-react";
import { Link } from "react-router";

const features = [
  {
    icon: BookOpen,
    title: "Guided JLPT lessons",
    description:
      "Study beginner grammar and vocabulary through structured N5 lessons.",
  },
  {
    icon: Languages,
    title: "Kana and kanji trainer",
    description:
      "Practice hiragana, katakana, and essential kanji with instant feedback.",
  },
  {
    icon: Brain,
    title: "Flashcard review",
    description: "Create decks, review due cards, and build long-term memory.",
  },
];

const previewStats = [
  { label: "Lessons", value: "N5" },
  { label: "Practice", value: "Kana" },
  { label: "Review", value: "SRS" },
];

const Landing = () => {
  return (
    <main className="min-h-screen bg-paper text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-nihon-red text-lg font-black text-white">
            日
          </div>

          <div>
            <strong className="block text-xl leading-none">NihonGo!</strong>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Japanese for english speakers
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-xl px-4 py-2 text-sm font-bold text-zinc-600 transition hover:text-nihon-red dark:text-zinc-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-xl bg-zinc-950 px-4 py-2 text-sm font-bold text-white transition hover:text-nihon-red dark:bg-white dark:text-zinc-950"
          >
            Register
          </Link>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-10 lg:grid-cols-[1fr_460px] lg:items-center lg:pt-20">
        <div>
          <span className="inline-flex rounded-full bg-sakura-soft px-4 py-2 text-sm font-black text-nihon-red">
            English → Japanese
          </span>

          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-tight tracking-tight text-zinc-950 dark:text-white md:text-7xl">
            Learn Japanese with lessons, practice and review that stay in sync.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
            NihonGo! helps English speakers study Japanese through JLPT modules,
            interactive exercises, kana and kanji practice, and flashcard
            reviews.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-2xl bg-nihon-red px-6 py-4 text-sm font-black text-white transition hover:bg-nihon-red-dark"
            >
              Start learning
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-2xl px-6 py-4 border border-zinc-200 text-sm font-black text-zinc-800 transition hover:border-red-200 hover:bg-red-50 dark:border-zinc-800 dark:text-zinc-100 dark:hover:border-red-950 dark:hover:bg-red-950/30"
            >
              I have already an account
            </Link>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {previewStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <strong className="block text-2xl font-black text-nihon-red">
                  {stat.value}
                </strong>
                <span className="mt-1 block text-xs font-bold uppercase text-zinc-500">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
          <div className="rounded-2xl bg-zinc-950 p-5 text-white">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-sakura">
                Today&apos;s lesson
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">
                JLPT N5
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-bold">Particle を</h2>

            <div className="mt-6 rounded-2xl bg-white p-4 text-zinc-950">
              <p className="text-sm font-bold text-zinc-500">Exercise</p>
              <p className="mt-2 text-2xl font-black">水＿＿飲みます。</p>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {["を", "は", "に"].map((option) => (
                  <div
                    key={option}
                    className={
                      option === "を"
                        ? "rounded-xl bg-nihon-red px-3 py-2 text-center font-black text-white"
                        : "rounded-xl bg-zinc-100 px-3 py-2 text-center font-black text-zinc-600"
                    }
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="flex gap-4 rounded-2xl border border-zinc-100 p-4 dark:border-zinc-800"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-nihon-red dark:bg-red-950/30">
                    <Icon size={21} />
                  </div>

                  <div>
                    <h3 className="font-black text-zinc-950 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-12 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {[
            "Follow a clear N5 path",
            "Practice characters daily",
            "Review cards when they are due",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle2 className="text-nihon-red" size={22} />
              <span className="font-bold text-zinc-700 dark:text-zinc-200">
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Landing;
