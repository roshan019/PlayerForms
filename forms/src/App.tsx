import "./App.css";
import { useEffect, useState, useCallback } from "react";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { AddPlayer } from "./pages/AddPlayer";
import { EditPlayer } from "./pages/EditPlayer";
import { DeleteConfirmModal } from "./components/DeleteConfirmModal";
import { usePlayerManager } from "./hooks/usePlayerManager";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const storedTheme = localStorage.getItem("app_theme");
    return storedTheme === "dark" ? "dark" : "light";
  });

  const {
    players,
    searchTerm,
    setSearchTerm,
    showAddPlayer,
    setShowAddPlayer,
    editingPlayerIndex,
    setEditingPlayerIndex,
    deletingPlayerIndex,
    setDeletingPlayerIndex,
    filteredPlayers,
    handleAddPlayer,
    handleDeletePlayer,
    handleConfirmDelete,
    handleEditPlayer,
    handleSavePlayer,
  } = usePlayerManager();

  const isEditing = editingPlayerIndex !== null;
  const editingPlayer = editingPlayerIndex !== null ? players[editingPlayerIndex] : null;

  const handleAddPlayerClick = useCallback(() => {
    setEditingPlayerIndex(null);
    setShowAddPlayer(true);
  }, [setEditingPlayerIndex, setShowAddPlayer]);

  const handleHomeClick = useCallback(() => {
    setShowAddPlayer(false);
    setEditingPlayerIndex(null);
  }, [setShowAddPlayer, setEditingPlayerIndex]);

  const handleThemeToggle = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(theme === "dark" ? "theme-dark" : "theme-light");
    localStorage.setItem("app_theme", theme);
  }, [theme]);

  return (
    <>
      <Header
        onAddPlayerClick={handleAddPlayerClick}
        onHomeClick={handleHomeClick}
        theme={theme}
        onThemeToggle={handleThemeToggle}
      />

      {showAddPlayer ? (
        <AddPlayer
          onPlayerAdded={handleAddPlayer}
          onClose={() => setShowAddPlayer(false)}
        />
      ) : isEditing && editingPlayer ? (
        <EditPlayer
          player={editingPlayer}
          index={editingPlayerIndex}
          onSave={handleSavePlayer}
          onCancel={() => setEditingPlayerIndex(null)}
        />
      ) : (
        <Home
          players={filteredPlayers}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onEdit={handleEditPlayer}
          onDelete={handleDeletePlayer}
        />
      )}

      {deletingPlayerIndex !== null && players[deletingPlayerIndex] && (
        <DeleteConfirmModal
          player={players[deletingPlayerIndex]}
          onCancel={() => setDeletingPlayerIndex(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}

export default App;
