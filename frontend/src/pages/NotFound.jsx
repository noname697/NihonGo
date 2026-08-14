import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-paper-soft px-4 py-12 text-zinc-950 dark:text-white">
      <section className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm font-bold uppercase text-nihon-red">404</p>

        <h1 className="mt-3 text-4xl font-black">Page not found</h1>

        <p className="mt-4 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
          This page does not exist or may have been moved. Return to NihonGo!
          and keep learning Japanese from the right place.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-xl bg-nihon-red px-5 py-3 text-sm font-bold text-white transition hover:bg-nihon-red-dark">
            <Home size={18} /> Go Home
          </Link>

          <Link to="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-100 px-5 py-3 text-sm font-bold text-zinc-700 transition hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700">
            <ArrowLeft size={18}/> Back to dashboard
          </Link>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
