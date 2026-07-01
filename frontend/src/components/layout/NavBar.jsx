import { Link, NavLink } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { ThemeToggle } from "./ThemeToggle";
import { LogOut } from "lucide-react";

const NavLinkClass = ({ isActive }) => {
  return [
    "text-sm font-medium transition",
    isActive
      ? "text-nihon-red"
      : "text-zinc-600 hover:text-nihon-red dark:text-zinc-300 dark:hover:text-sakura",
  ].join(" ");
};

export const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-nihon-red text-sm font-black text-white">
            日
          </div>
          <strong className="block text-lg leading-none text-zinc-950 dark:text-white">
            NihonGo!
          </strong>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            Learn Japanese
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/dashboard" className={NavLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/modules" className={NavLinkClass}>
            Modules
          </NavLink>
          <NavLink to="/trainer" className={NavLinkClass}>
            Trainer
          </NavLink>
          <NavLink to="/flashcards" className={NavLinkClass}>
            Flashcards
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {user && (
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              <LogOut size={16} />
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
