import { SearchBar } from "../components/SearchBar";
import { PlayerList } from "../components/PlayerList";
import { FormInput } from "../types/FormInput";

interface HomeProps {
  players: FormInput[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

export function Home({
  players,
  searchTerm,
  onSearchChange,
  onEdit,
  onDelete,
}: HomeProps) {
  return (
    <>
      <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
      <PlayerList players={players} onEdit={onEdit} onDelete={onDelete} />
    </>
  );
}
