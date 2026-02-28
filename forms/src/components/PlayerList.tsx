import "./PlayerList.css";
import type { FormInput } from "../types/FormInput";
import { useState, useEffect } from "react";

interface PlayerListProps {
  players: FormInput[];
  onEdit?: (index: number) => void;
  onDelete?: (index: number) => void;
}

export function PlayerList({ players, onEdit, onDelete }: PlayerListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [players]);

  const totalPages = Math.ceil(players.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPlayers = players.slice(startIndex, startIndex + itemsPerPage);

  const getFormatDisplay = (player: FormInput) => {
    const formats: string[] = [];
    if (player.test) formats.push("Test");
    if (player.odi) formats.push("ODI");
    if (player.t20) formats.push("T20");
    return formats.length > 0 ? formats.join(", ") : "-";
  };

  if (players.length === 0) {
    return (
      <div className="player-list-container">
        <div className="no-players">
          <p>No players registered yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="player-list-container">
      <div className="players-table-wrapper">
        <table className="players-table">
          <thead>
            <tr>
              <th>FULL NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th>ADDRESS</th>
              <th>DOB</th>
              <th>AGE</th>
              <th>HEIGHT</th>
              <th>ROLE</th>
              <th>FORMAT</th>
              <th>JERSEY NO</th>
              <th>GENDER</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {currentPlayers.map((player, index) => {
              const absoluteIndex = startIndex + index;
              return (
                <tr key={absoluteIndex}>
                  <td>{player.fullname}</td>
                  <td>{player.email}</td>
                  <td>{player.PhoneNo}</td>
                  <td>{player.address || "-"}</td>
                  <td>{player.DateOfBirth || "-"}</td>
                  <td>{player.age || "-"}</td>
                  <td>{player.height || "-"}</td>
                  <td>{player.role || "-"}</td>
                  <td>{getFormatDisplay(player)}</td>
                  <td>{player.JerseyNo || "-"}</td>
                  <td>{player.gender || "-"}</td>
                  <td className="actions-cell">
                    <button
                      className="edit-btn"
                      onClick={() => onEdit && onEdit(absoluteIndex)}
                      title="Edit player"
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => onDelete && onDelete(absoluteIndex)}
                      title="Delete player"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Previous
          </button>
          <span className="pagination-info">Page {currentPage} of {totalPages}</span>
          <button
            className="pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
