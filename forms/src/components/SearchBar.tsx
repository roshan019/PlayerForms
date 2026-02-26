import "./SearchBar.css";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search players by name or email..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
}
