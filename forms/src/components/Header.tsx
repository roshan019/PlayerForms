import "./Header.css";

interface HeaderProps {
  onAddPlayerClick: () => void;
  onHomeClick: () => void;
}

export function Header({ onAddPlayerClick, onHomeClick }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-left">
        <button className="nav-link" onClick={onHomeClick}>
          Player Registration
        </button>
      </div>

      <div className="header-right">
        <button className="nav-link" onClick={onHomeClick}>
          Home
        </button>
        <button className="add-player-btn" onClick={onAddPlayerClick}>
          Add Player
        </button>
      </div>
    </header>
  );
}
