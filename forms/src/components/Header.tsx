import "./Header.css";

interface HeaderProps {
  onAddPlayerClick: () => void;
  onHomeClick: () => void;
  theme: "light" | "dark";
  onThemeToggle: () => void;
}

export function Header({}: HeaderProps) {
  return null;
}
