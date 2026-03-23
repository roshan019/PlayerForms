import { SearchBar } from "../components/SearchBar";
import { PlayerList } from "../components/PlayerList";
import { CricketTopNav } from "../components/CricketTopNav";
import type { FormInput } from "../types/FormInput";

interface HomeProps {
  players: FormInput[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * The Home component renders a search bar and a player list.
 *
 * @param {FormInput[]} players - The list of players to display.
 * @param {string} searchTerm - The current search term.
 * @param {function} onSearchChange - Function to call when the search term changes.
 * @param {function} onEdit - Function to call when a player is edited.
 * @param {function} onDelete - Function to call when a player is deleted.
 */
/*******  4dbad893-961f-49e9-b3ba-12832e2f024a  *******/
export function Home({
  players,
  searchTerm,
  onSearchChange,
  onEdit,
  onDelete,
}: HomeProps) {
  return (
    <>
      <CricketTopNav />
      <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
      <PlayerList players={players} onEdit={onEdit} onDelete={onDelete} />
    </>
  );
}
