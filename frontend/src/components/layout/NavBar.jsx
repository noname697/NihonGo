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
    <header className="">
      <div className="">
        <Link to="/" className="">
          <div className="">日</div>
          <strong className="">NihonGo!</strong>
          <span className="">Learn Japanese</span>
        </Link>

        <nav className="">
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

        <div className="">
          <ThemeToggle />

          {user && (
            <button type="button" onClick={logout} className="">
              <LogOut size={16} />
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
