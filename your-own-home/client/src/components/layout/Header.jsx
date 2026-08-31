import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

const Header = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="text-xl font-bold text-brand-600 dark:text-brand-400">
          Your Own Home
        </Link>

        <Link
          to="/search"
          className="hidden sm:flex items-center gap-2 flex-1 max-w-md mx-4 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400 hover:shadow-md transition"
        >
          Search destinations…
        </Link>

        <nav className="flex items-center gap-3 text-sm">
          <Link
            to={user?.role === 'host' ? '/dashboard/host' : '/dashboard/host'}
            className="hidden md:inline hover:underline"
          >
            Become a Host
          </Link>

          {user && (
            <Link to="/messages" className="hidden md:inline hover:underline">
              Messages
            </Link>
          )}

          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to={
                  user.role === 'admin'
                    ? '/dashboard/admin'
                    : user.role === 'host'
                    ? '/dashboard/host'
                    : '/dashboard/guest'
                }
                className="font-medium hover:underline"
              >
                {user.name}
              </Link>
              <button
                onClick={logout}
                className="px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="px-3 py-1.5 rounded-full bg-brand-500 text-white hover:bg-brand-600"
              >
                Sign up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
