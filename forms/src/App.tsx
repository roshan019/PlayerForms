import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { AddPlayer } from "./pages/AddPlayer";
import { EditPlayer } from "./pages/EditPlayer";
import type { FormInput } from "./types/FormInput";

function App() {
  const [players, setPlayers] = useState<FormInput[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [editingPlayerIndex, setEditingPlayerIndex] = useState<number | null>(null);

  const handleAddPlayer = (playerData: FormInput) => {
    setPlayers([...players, playerData]);
    setShowAddPlayer(false);
  };

  const handleDeletePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const handleEditPlayer = (index: number) => {
    setEditingPlayerIndex(index);
  };

  const handleSavePlayer = (index: number, updatedPlayer: FormInput) => {
    const newPlayers = [...players];
    newPlayers[index] = updatedPlayer;
    setPlayers(newPlayers);
    setEditingPlayerIndex(null);
  };

  const filteredPlayers = players.filter((player) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (player.fullname?.toLowerCase().includes(searchLower) || false) ||
      (player.email?.toLowerCase().includes(searchLower) || false)
    );
  });

  return (
    <>
      <Header 
        onAddPlayerClick={() => setShowAddPlayer(true)}
        onHomeClick={() => {}}
      />
      <Home
        players={filteredPlayers}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onEdit={handleEditPlayer}
        onDelete={handleDeletePlayer}
      />
      
      {showAddPlayer && (
        <AddPlayer
          onPlayerAdded={handleAddPlayer}
          onClose={() => setShowAddPlayer(false)}
        />
      )}

      {editingPlayerIndex !== null && (
        <EditPlayer
          player={players[editingPlayerIndex]}
          index={editingPlayerIndex}
          onSave={handleSavePlayer}
          onCancel={() => setEditingPlayerIndex(null)}
        />
      )}
    </>
  );
}

export default App;
