import { useState, useEffect } from "react";
import type { FormInput } from "../types/FormInput";

const STORAGE_KEY = "players_data";
const DELETED_KEYS_STORAGE = "players_deleted_keys";
const MIN_VISIBLE_PLAYERS = 10;
const defaultPlayers: FormInput[] = [
  { fullname: "Virat Kohli", email: "virat@example.com", phoneNo: "9000000001", address: "Delhi, India", dateOfBirth: "1988-11-05", age: "37", gender: "Male", jerseyNo: "18", height: "175", role: "Batsman", test: true, odi: true, t20: true },
  { fullname: "Rohit Sharma", email: "rohit@example.com", phoneNo: "9000000002", address: "Mumbai, India", dateOfBirth: "1987-04-30", age: "38", gender: "Male", jerseyNo: "45", height: "174", role: "Batsman", test: true, odi: true, t20: true },
  { fullname: "Jasprit Bumrah", email: "bumrah@example.com", phoneNo: "9000000003", address: "Ahmedabad, India", dateOfBirth: "1993-12-06", age: "32", gender: "Male", jerseyNo: "93", height: "178", role: "Bowler", test: true, odi: true, t20: true },
  { fullname: "Ravindra Jadeja", email: "jadeja@example.com", phoneNo: "9000000004", address: "Jamnagar, India", dateOfBirth: "1988-12-06", age: "37", gender: "Male", jerseyNo: "8", height: "173", role: "Bowler", test: true, odi: true, t20: false },
  { fullname: "KL Rahul", email: "rahul@example.com", phoneNo: "9000000005", address: "Bengaluru, India", dateOfBirth: "1992-04-18", age: "34", gender: "Male", jerseyNo: "1", height: "180", role: "Wicket Keeper", test: true, odi: true, t20: true },
  { fullname: "Hardik Pandya", email: "hardik@example.com", phoneNo: "9000000006", address: "Vadodara, India", dateOfBirth: "1993-10-11", age: "32", gender: "Male", jerseyNo: "33", height: "183", role: "Bowler", test: false, odi: true, t20: true },
  { fullname: "Shubman Gill", email: "gill@example.com", phoneNo: "9000000007", address: "Fazilka, India", dateOfBirth: "1999-09-08", age: "27", gender: "Male", jerseyNo: "77", height: "178", role: "Batsman", test: true, odi: true, t20: true },
  { fullname: "Mohammed Siraj", email: "siraj@example.com", phoneNo: "9000000008", address: "Hyderabad, India", dateOfBirth: "1994-03-13", age: "32", gender: "Male", jerseyNo: "73", height: "178", role: "Bowler", test: true, odi: true, t20: false },
  { fullname: "Suryakumar Yadav", email: "sky@example.com", phoneNo: "9000000009", address: "Mumbai, India", dateOfBirth: "1990-09-14", age: "35", gender: "Male", jerseyNo: "63", height: "180", role: "Batsman", test: false, odi: true, t20: true },
  { fullname: "Rishabh Pant", email: "pant@example.com", phoneNo: "9000000010", address: "Roorkee, India", dateOfBirth: "1997-10-04", age: "29", gender: "Male", jerseyNo: "17", height: "170", role: "Wicket Keeper", test: true, odi: true, t20: true },
  { fullname: "Yashasvi Jaiswal", email: "jaiswal@example.com", phoneNo: "9000000011", address: "Suriyawan, India", dateOfBirth: "2001-12-28", age: "24", gender: "Male", jerseyNo: "64", height: "178", role: "Batsman", test: true, odi: false, t20: true },
  { fullname: "Kuldeep Yadav", email: "kuldeep@example.com", phoneNo: "9000000012", address: "Kanpur, India", dateOfBirth: "1994-12-14", age: "31", gender: "Male", jerseyNo: "23", height: "168", role: "Bowler", test: true, odi: true, t20: true },
];

const getPlayerKey = (player: FormInput) =>
  (player.email || player.fullname || "").trim().toLowerCase();

const readDeletedKeys = (): Set<string> => {
  const raw = localStorage.getItem(DELETED_KEYS_STORAGE);
  if (!raw) return new Set<string>();
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set<string>();
    return new Set<string>(
      parsed
        .map((value) => String(value).trim().toLowerCase())
        .filter(Boolean)
    );
  } catch {
    return new Set<string>();
  }
};

const writeDeletedKeys = (deletedKeys: Set<string>) => {
  localStorage.setItem(DELETED_KEYS_STORAGE, JSON.stringify([...deletedKeys]));
};

const fillFromDefaults = (player: FormInput): FormInput => {
  const key = getPlayerKey(player);
  const defaultMatch = defaultPlayers.find((defaultPlayer) => getPlayerKey(defaultPlayer) === key);
  return defaultMatch ? { ...defaultMatch, ...player } : player;
};

const loadInitialPlayers = (): FormInput[] => {
  const deletedKeys = readDeletedKeys();
  const savedPlayers = localStorage.getItem(STORAGE_KEY);
  if (!savedPlayers) {
    return defaultPlayers.filter((player) => !deletedKeys.has(getPlayerKey(player)));
  }

  try {
    const parsed = JSON.parse(savedPlayers);
    if (!Array.isArray(parsed)) {
      return defaultPlayers.filter((player) => !deletedKeys.has(getPlayerKey(player)));
    }

    const savedList = (parsed as FormInput[])
      .filter((player) => !deletedKeys.has(getPlayerKey(player)))
      .map(fillFromDefaults);
    const existingKeys = new Set(savedList.map(getPlayerKey).filter(Boolean));
    const extraDefaults = defaultPlayers.filter(
      (defaultPlayer) =>
        !existingKeys.has(getPlayerKey(defaultPlayer)) &&
        !deletedKeys.has(getPlayerKey(defaultPlayer))
    );

    if (savedList.length >= MIN_VISIBLE_PLAYERS) {
      return savedList;
    }

    return [...savedList, ...extraDefaults.slice(0, MIN_VISIBLE_PLAYERS - savedList.length)];
  } catch {
    return defaultPlayers.filter((player) => !deletedKeys.has(getPlayerKey(player)));
  }
};

export function usePlayerManager() {
  const [players, setPlayers] = useState<FormInput[]>(loadInitialPlayers);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [editingPlayerIndex, setEditingPlayerIndex] = useState<number | null>(null);
  const [deletingPlayerIndex, setDeletingPlayerIndex] = useState<number | null>(null);

  const filteredPlayers = players.filter((player) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (player.fullname?.toLowerCase().includes(searchLower) || false) ||
      (player.email?.toLowerCase().includes(searchLower) || false)
    );
  });

  // Save players to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
  }, [players]);

  const handleAddPlayer = (playerData: FormInput) => {
    const playerKey = getPlayerKey(playerData);
    if (playerKey) {
      const deletedKeys = readDeletedKeys();
      if (deletedKeys.delete(playerKey)) {
        writeDeletedKeys(deletedKeys);
      }
    }
    setPlayers([...players, playerData]);
    setShowAddPlayer(false);
  };

  const handleDeletePlayer = (filteredIndex: number) => {
    const targetPlayer = filteredPlayers[filteredIndex];
    if (!targetPlayer) return;
    const realIndex = players.indexOf(targetPlayer);
    if (realIndex < 0) return;
    setDeletingPlayerIndex(realIndex);
  };

  const handleConfirmDelete = () => {
    if (deletingPlayerIndex === null) return;
    setPlayers((prev) => {
      const playerToDelete = prev[deletingPlayerIndex];
      const playerKey = playerToDelete ? getPlayerKey(playerToDelete) : "";
      if (playerKey) {
        const deletedKeys = readDeletedKeys();
        deletedKeys.add(playerKey);
        writeDeletedKeys(deletedKeys);
      }
      return prev.filter((_, i) => i !== deletingPlayerIndex);
    });
    setDeletingPlayerIndex(null);
  };

  const handleEditPlayer = (filteredIndex: number) => {
    const targetPlayer = filteredPlayers[filteredIndex];
    if (!targetPlayer) return;
    const realIndex = players.indexOf(targetPlayer);
    if (realIndex < 0) return;
    setEditingPlayerIndex(realIndex);
  };

  const handleSavePlayer = (index: number, updatedPlayer: FormInput) => {
    const playerKey = getPlayerKey(updatedPlayer);
    if (playerKey) {
      const deletedKeys = readDeletedKeys();
      if (deletedKeys.delete(playerKey)) {
        writeDeletedKeys(deletedKeys);
      }
    }
    const newPlayers = [...players];
    newPlayers[index] = updatedPlayer;
    setPlayers(newPlayers);
    setEditingPlayerIndex(null);
  };

  return {
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
  };
}
