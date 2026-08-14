import { Link, NavLink } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { ThemeToggle } from "./ThemeToggle";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

const NavLinkClass = ({ isActive }) => {
  return [
    "text-sm font-medium transition",
    isActive
      ? "text-nihon-red"
      : "text-zinc-600 hover:text-nihon-red dark:text-zinc-300 dark:hover:text-sakura",
  ].join(" ");
};

const navItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/modules", label: "Modules" },
  { to: "/trainer", label: "Trainer" },
  { to: "/flashcards", label: "Flashcards" },
];

export const NavBar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={NavLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 dark:text-zinc-200 transition hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 md:hidden"
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
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
      {isMenuOpen && (
        <nav className="border-t border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950 md:hidden">
          <div className="mx-auto grid max-w-6xl gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  [
                    "rounded-xl px-4 py-3 text-sm font-bold transition",
                    isActive
                      ? "bg-red-50 text-nihon-red dark:bg-red-950/40"
                      : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};
