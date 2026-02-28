import type { FormInput } from "../types/FormInput";
import { PlayerRegistration } from "../components/PlayerRegistration";
import "./AddPlayer.css";

interface EditPlayerProps {
  player: FormInput;
  index: number;
  onSave: (index: number, updatedPlayer: FormInput) => void;
  onCancel: () => void;
}

export function EditPlayer({ player, index, onSave, onCancel }: EditPlayerProps) {
  return (
    <div className="add-player-page">
      <PlayerRegistration
        initialPlayer={player}
        title="Player Registration Forms"
        submitLabel="Save"
        onPlayerRegistered={(updatedPlayer) => onSave(index, updatedPlayer)}
        onCancel={onCancel}
      />
    </div>
  );
}
