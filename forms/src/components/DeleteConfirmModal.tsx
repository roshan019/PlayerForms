import type { FormInput } from "../types/FormInput";
import "./DeleteConfirmModal.css";

interface DeleteConfirmModalProps {
  player: FormInput;
  onCancel: () => void;
  onConfirm: () => void;
}

function getFormatValue(player: FormInput) {
  const formats: string[] = [];
  if (player.test) formats.push("Test");
  if (player.odi) formats.push("ODI");
  if (player.t20) formats.push("T20");
  return formats.length > 0 ? formats.join(", ") : "-";
}

export function DeleteConfirmModal({ player, onCancel, onConfirm }: DeleteConfirmModalProps) {
  return (
    <div className="delete-modal-overlay" role="dialog" aria-modal="true" aria-label="Confirm delete">
      <div className="delete-modal-card">
        <button className="delete-modal-close" type="button" onClick={onCancel} aria-label="Close delete dialog">
          x
        </button>

        <h3>Confirm Delete</h3>
        <p>
          Are you sure you want to delete <strong>{player.fullname || "this player"}</strong>?
        </p>

        <div className="delete-modal-details">
          <div>
            <span>Email</span>
            <p>{player.email || "-"}</p>
          </div>
          <div>
            <span>Phone</span>
            <p>{player.PhoneNo || "-"}</p>
          </div>
          <div>
            <span>Role</span>
            <p>{player.role || "-"}</p>
          </div>
          <div>
            <span>Gender</span>
            <p>{player.gender || "-"}</p>
          </div>
          <div>
            <span>Date Of Birth</span>
            <p>{player.DateOfBirth || "-"}</p>
          </div>
          <div>
            <span>Format</span>
            <p>{getFormatValue(player)}</p>
          </div>
        </div>

        <div className="delete-modal-actions">
          <button className="delete-cancel-btn" type="button" onClick={onCancel}>
            Cancel
          </button>
          <button className="delete-confirm-btn" type="button" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
