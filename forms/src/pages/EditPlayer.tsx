import type { FormInput } from "../types/FormInput";
import { PlayerRegistration } from "../components/PlayerRegistration";
import { CricketTopNav } from "../components/CricketTopNav";
import "./AddPlayer.css";

interface EditPlayerProps {
  player: FormInput;
  index: number;
  onSave: (index: number, updatedPlayer: FormInput) => void;
  onCancel: () => void;
}

export function EditPlayer({ index, onSave }: EditPlayerProps) {
  return (
    <>
      <CricketTopNav />
      <div className="add-player-page">
        <PlayerRegistration
          onPlayerRegistered={(updatedPlayer) => onSave(index, updatedPlayer)}
        />
      </div>
    </>
  );
}
