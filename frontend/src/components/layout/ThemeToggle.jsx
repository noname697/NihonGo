import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-full border border-zinc-200 bg-white p-2 text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark-text-white dark:hover:bg-zinc-900"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun color="white" size={18} /> : <Moon size={18} />}
    </button>
  );
};
