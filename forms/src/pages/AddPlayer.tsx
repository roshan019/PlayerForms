import { useState } from "react";
import type { FormInput } from "../types/FormInput";
import "./AddPlayer.css";

interface AddPlayerProps {
  onPlayerAdded: (playerData: FormInput) => void;
  onClose: () => void;
}

export function AddPlayer({ onPlayerAdded, onClose }: AddPlayerProps) {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    PhoneNo: "",
    age: "",
    DateOfBirth: "",
    gender: "",
    address: "",
    JerseyNo: "",
    role: "",
    height: "",
    test: false,
    odi: false,
    t20: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const type = (e.target as HTMLInputElement).type;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const playerData: FormInput = {
      fullname: formData.fullname,
      email: formData.email,
      phoneNo: formData.PhoneNo,
      age: formData.age,
      dateOfBirth: formData.DateOfBirth,
      gender: formData.gender,
      address: formData.address,
      jerseyNo: formData.JerseyNo,
      role: formData.role,
      height: formData.height,
      test: formData.test,
      odi: formData.odi,
      t20: formData.t20,
    };

    onPlayerAdded(playerData);
    onClose();
  };

  return (
    <div className="add-player-page">
      <div className="add-player-card">
        <h2>Player Form</h2>
        <form className="add-player-form-grid" onSubmit={handleSubmit}>
          <div className="add-player-field">
            <label htmlFor="fullname">Fullname</label>
            <input
              id="fullname"
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="add-player-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="add-player-field">
            <label htmlFor="PhoneNo">Phone No.</label>
            <input
              id="PhoneNo"
              type="tel"
              name="PhoneNo"
              value={formData.PhoneNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="add-player-field">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="add-player-field">
            <label htmlFor="DateOfBirth">Date Of Birth</label>
            <input
              id="DateOfBirth"
              type="date"
              name="DateOfBirth"
              value={formData.DateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div className="add-player-field">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="add-player-field">
            <label htmlFor="JerseyNo">Jersey No.</label>
            <input
              id="JerseyNo"
              type="number"
              name="JerseyNo"
              value={formData.JerseyNo}
              onChange={handleChange}
            />
          </div>

          <div className="add-player-field">
            <label htmlFor="height">Height</label>
            <input
              id="height"
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
            />
          </div>

          <div className="add-player-field add-player-group">
            <p>Gender</p>
            <div className="add-player-options">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  required
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                />
                Female
              </label>
            </div>
          </div>

          <div className="add-player-field add-player-group">
            <p>Role</p>
            <div className="add-player-options add-player-options-wrap">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="Batsman"
                  checked={formData.role === "Batsman"}
                  onChange={handleChange}
                  required
                />
                Batsman
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="Bowler"
                  checked={formData.role === "Bowler"}
                  onChange={handleChange}
                />
                Bowler
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="All-rounder"
                  checked={formData.role === "All-rounder"}
                  onChange={handleChange}
                />
                All-rounder
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="Wicket Keeper"
                  checked={formData.role === "Wicket Keeper"}
                  onChange={handleChange}
                />
                Wicket Keeper
              </label>
            </div>
          </div>

          <div className="add-player-field add-player-group add-player-format-group">
            <p>Format</p>
            <div className="add-player-options">
              <label>
                <input
                  type="checkbox"
                  name="test"
                  checked={formData.test}
                  onChange={handleChange}
                />
                Test
              </label>
              <label>
                <input
                  type="checkbox"
                  name="odi"
                  checked={formData.odi}
                  onChange={handleChange}
                />
                ODI
              </label>
              <label>
                <input
                  type="checkbox"
                  name="t20"
                  checked={formData.t20}
                  onChange={handleChange}
                />
                T20
              </label>
            </div>
          </div>

          <button type="submit" className="add-player-save-btn">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
