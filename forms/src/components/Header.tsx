import "./Header.css";

interface HeaderProps {
  onAddPlayerClick: () => void;
  onHomeClick: () => void;
  theme: "light" | "dark";
  onThemeToggle: () => void;
}

export function Header({
  onAddPlayerClick,
  onHomeClick,
  theme,
  onThemeToggle,
}: HeaderProps) {
  return (
    <header className="header">
      <div className="header-left">
        <button className="nav-link" onClick={onHomeClick}>
          Player Management
        </button>
      </div>

      <div className="header-right">
        <button className="nav-link" onClick={onHomeClick}>
          Home
        </button>
        <button className="add-player-btn" onClick={onAddPlayerClick}>
          Add Player
        </button>
        <button
          className={`theme-switch ${theme === "dark" ? "dark" : ""}`}
          onClick={onThemeToggle}
          role="switch"
          aria-checked={theme === "dark"}
          aria-label="Toggle theme"
          title={theme === "light" ? "Switch to black theme" : "Switch to white theme"}
        >
          <span className="theme-switch-track">
            <span className="theme-icon sun">☀</span>
            <span className="theme-icon moon">☾</span>
          </span>
          <span className="theme-switch-thumb">
            <span className="theme-switch-thumb-icon">
              {theme === "light" ? "☀" : "☾"}
            </span>
          </span>
        </button>
      </div>
    </header>
  );
}
