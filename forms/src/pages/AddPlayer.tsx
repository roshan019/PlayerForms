import type { FormInput } from "../types/FormInput";
import { PlayerRegistration } from "../components/PlayerRegistration";
import "./AddPlayer.css";

interface AddPlayerProps {
  onPlayerAdded: (playerData: FormInput) => void;
  onClose: () => void;
}

export function AddPlayer({ onPlayerAdded, onClose }: AddPlayerProps) {
  return (
    <div className="add-player-page">
      <PlayerRegistration
        onPlayerRegistered={(playerData: FormInput) => {
          onPlayerAdded(playerData);
          onClose();
        }}
        onCancel={onClose}
      />
    </div>
  );
}
