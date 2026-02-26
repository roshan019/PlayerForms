import "./PlayerList.css";

interface FormInput {
  fullname?: string;
  email?: string;
  PhoneNo?: string;
  address?: string;
  DateOfBirth?: string;
  age?: string;
  gender?: string;
  JerseyNo?: string;
  height?: string;
  role?: string;
  test?: boolean;
  odi?: boolean;
  t20?: boolean;
}

interface PlayerListProps {
  players: FormInput[];
  onEdit?: (index: number) => void;
  onDelete?: (index: number) => void;
}

export function PlayerList({ players, onEdit, onDelete }: PlayerListProps) {
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
              <th>ROLE</th>
              <th>JERSEY NO</th>
              <th>GENDER</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index}>
                <td>{player.fullname}</td>
                <td>{player.email}</td>
                <td>{player.PhoneNo}</td>
                <td>{player.role}</td>
                <td>{player.JerseyNo || "-"}</td>
                <td>{player.gender}</td>
                <td className="actions-cell">
                  <button 
                    className="edit-btn" 
                    onClick={() => onEdit && onEdit(index)}
                    title="Edit player"
                  >
                    ✎ Edit
                  </button>
                  <button 
                    className="delete-btn" 
                    onClick={() => onDelete && onDelete(index)}
                    title="Delete player"
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
