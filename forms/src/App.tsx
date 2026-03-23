import "./App.css";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AddPlayer } from "./pages/AddPlayer";
import { EditPlayer } from "./pages/EditPlayer";
import { Home } from "./pages/Home";
import { PlayerDetailsPage } from "./pages/PlayerDetailsPage";
import { TeamDetailsPage } from "./pages/TeamDetailsPage";
import { UpcomingMatchDetailsPage } from "./pages/UpcomingMatchDetailsPage";
import { MatchCompletionPage } from "./pages/MatchCompletionPage";
import { DeleteConfirmModal } from "./components/DeleteConfirmModal";
import { usePlayerManager } from "./hooks/usePlayerManager";
import type { FormInput } from "./types/FormInput";

interface EditPlayerRouteProps {
  players: FormInput[];
  onSave: (index: number, updatedPlayer: FormInput) => void;
  onCancel: () => void;
}

interface PlayerDetailsRouteProps {
  players: FormInput[];
}

function EditPlayerRoute({ players, onSave, onCancel }: EditPlayerRouteProps) {
  const { index } = useParams<{ index: string }>();
  const parsedIndex = Number(index);
  const isValidIndex = Number.isInteger(parsedIndex) && parsedIndex >= 0 && parsedIndex < players.length;

  if (!isValidIndex) {
    return <Navigate to="/" replace />;
  }

  return (
    <EditPlayer
      player={players[parsedIndex]}
      index={parsedIndex}
      onSave={(targetIndex, updatedPlayer) => {
        onSave(targetIndex, updatedPlayer);
        onCancel();
      }}
      onCancel={onCancel}
    />
  );
}

function PlayerDetailsRoute({ players }: PlayerDetailsRouteProps) {
  const { index } = useParams<{ index: string }>();
  const parsedIndex = Number(index);
  const isValidIndex = Number.isInteger(parsedIndex) && parsedIndex >= 0 && parsedIndex < players.length;

  if (!isValidIndex) {
    return <Navigate to="/players" replace />;
  }

  return <PlayerDetailsPage player={players[parsedIndex]} />;
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const storedTheme = localStorage.getItem("app_theme");
    return storedTheme === "dark" ? "dark" : "light";
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const {
    players,
    searchTerm,
    setSearchTerm,
    deletingPlayerIndex,
    setDeletingPlayerIndex,
    filteredPlayers,
    handleAddPlayer,
    handleDeletePlayer,
    handleConfirmDelete,
    handleSavePlayer,
  } = usePlayerManager();

  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(theme === "dark" ? "theme-dark" : "theme-light");
    localStorage.setItem("app_theme", theme);
  }, [theme]);

  useEffect(() => {
    if (location.pathname !== "/players") return;
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get("q") || "");
  }, [location.pathname, location.search, setSearchTerm]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              players={filteredPlayers}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onEdit={(filteredIndex) => {
                const targetPlayer = filteredPlayers[filteredIndex];
                if (!targetPlayer) return;
                const realIndex = players.indexOf(targetPlayer);
                if (realIndex < 0) return;
                navigate(`/players/edit/${realIndex}`);
              }}
              onDelete={handleDeletePlayer}
            />
          }
        />
        <Route
          path="/live"
          element={
            <HomePage
              initialTab="live"
              theme={theme}
              onThemeToggle={toggleTheme}
              players={players}
            />
          }
        />
        <Route
          path="/upcoming"
          element={
            <HomePage
              initialTab="upcoming"
              theme={theme}
              onThemeToggle={toggleTheme}
              players={players}
            />
          }
        />
        <Route path="/upcoming/:matchId" element={<UpcomingMatchDetailsPage />} />
        <Route
          path="/rankings"
          element={
            <HomePage
              initialTab="rankings"
              theme={theme}
              onThemeToggle={toggleTheme}
              players={players}
            />
          }
        />
        <Route
          path="/news"
          element={
            <HomePage
              initialTab="news"
              theme={theme}
              onThemeToggle={toggleTheme}
              players={players}
            />
          }
        />
        <Route path="/teams/:teamName" element={<TeamDetailsPage defaultFormat="ODI" />} />
        <Route
          path="/players"
          element={
            <Home
              players={filteredPlayers}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onEdit={(filteredIndex) => {
                const targetPlayer = filteredPlayers[filteredIndex];
                if (!targetPlayer) return;
                const realIndex = players.indexOf(targetPlayer);
                if (realIndex < 0) return;
                navigate(`/players/edit/${realIndex}`);
              }}
              onDelete={handleDeletePlayer}
            />
          }
        />
        <Route
          path="/players/profile/:index"
          element={<PlayerDetailsRoute players={players} />}
        />
        <Route
          path="/players/add"
          element={
            <AddPlayer
              onPlayerAdded={(playerData) => {
                handleAddPlayer(playerData);
                navigate("/");
              }}
              onClose={() => navigate("/")}
            />
          }
        />
        <Route
          path="/players/edit/:index"
          element={
            <EditPlayerRoute
              players={players}
              onSave={handleSavePlayer}
              onCancel={() => navigate("/")}
            />
          }
        />
        <Route path="/match-completion" element={<MatchCompletionPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

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
