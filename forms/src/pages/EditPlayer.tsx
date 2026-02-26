import { useState } from "react";
import type { FormInput } from "../types/FormInput";
import "./EditPlayer.css";

interface EditPlayerProps {
  player: FormInput;
  index: number;
  onSave: (index: number, updatedPlayer: FormInput) => void;
  onCancel: () => void;
}

export function EditPlayer({ player, index, onSave, onCancel }: EditPlayerProps) {
  const [input, setInput] = useState<FormInput>(player);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name;
    const value = (e.target as HTMLInputElement).type === "checkbox"
      ? (e.target as HTMLInputElement).checked
      : e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(index, input);
  };

  return (
    <div className="edit-player-overlay">
      <div className="edit-player-modal">
        <button className="close-btn" onClick={onCancel}>
          ✕
        </button>
        <div className="edit-player-form">
          <h3>Edit Player Details</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Player Fullname:
                <input
                  type="text"
                  name="fullname"
                  value={input.fullname || ""}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Email:
                <input
                  type="text"
                  name="email"
                  value={input.email || ""}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Phone No. :
                <input
                  type="number"
                  name="PhoneNo"
                  value={input.PhoneNo || ""}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Address:
                <input
                  type="text"
                  name="address"
                  value={input.address || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Date of Birth:
                <input
                  type="date"
                  name="DateOfBirth"
                  value={input.DateOfBirth || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Age:
                <input
                  type="number"
                  name="age"
                  value={input.age || ""}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div>
              <label>Gender:</label>
              <div className="form-group-radio">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={input.gender === "Male"}
                    onChange={handleChange}
                  />{" "}
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={input.gender === "Female"}
                    onChange={handleChange}
                  />{" "}
                  Female
                </label>
              </div>
            </div>

            <div>
              <label>
                Jersey No.:
                <input
                  type="number"
                  name="JerseyNo"
                  value={input.JerseyNo || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Height:
                <input
                  type="number"
                  name="height"
                  value={input.height || ""}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div>
              <label>Role:</label>
              <div className="form-group-radio">
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="Batsman"
                    checked={input.role === "Batsman"}
                    onChange={handleChange}
                  />{" "}
                  Batsman
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="Bowler"
                    checked={input.role === "Bowler"}
                    onChange={handleChange}
                  />{" "}
                  Bowler
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="Wicket Keeper"
                    checked={input.role === "Wicket Keeper"}
                    onChange={handleChange}
                  />{" "}
                  Wicket Keeper
                </label>
              </div>
            </div>

            <div>
              <label>Format:</label>
              <div className="form-group-radio">
                <label>
                  TEST:
                  <input
                    type="checkbox"
                    name="test"
                    checked={input.test || false}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  ODI:
                  <input
                    type="checkbox"
                    name="odi"
                    checked={input.odi || false}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  T20:
                  <input
                    type="checkbox"
                    name="t20"
                    checked={input.t20 || false}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>

            <div style={{ marginTop: "1.5rem" }}>
              <button type="submit" className="save-btn">Save Changes</button>
              <button type="button" className="cancel-btn" onClick={onCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
