import { PlayerRegistration } from "../components/PlayerRegistration";
import { FormInput } from "../types/FormInput";
import "./AddPlayer.css";

interface AddPlayerProps {
  onPlayerAdded: (playerData: FormInput) => void;
  onClose: () => void;
}

export function AddPlayer({ onPlayerAdded, onClose }: AddPlayerProps) {
  const handlePlayerRegistered = (playerData: FormInput) => {
    onPlayerAdded(playerData);
    onClose();
  };

  return (
    <div className="add-player-overlay">
      <div className="add-player-modal">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        <PlayerRegistration onPlayerRegistered={handlePlayerRegistered} />
      </div>
    </div>
  );
}
