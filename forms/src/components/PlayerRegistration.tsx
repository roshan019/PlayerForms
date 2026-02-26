import { useState } from "react";
import "./PlayerRegistration.css";

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

interface PlayerRegistrationProps {
  onPlayerRegistered?: (playerData: FormInput) => void;
}

export function PlayerRegistration({ onPlayerRegistered }: PlayerRegistrationProps) {
  const [input, setInput] = useState<FormInput>({});
  const [submittedData, setSubmittedData] = useState<FormInput | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,) => {
    const name = e.target.name;
    const value = (e.target as HTMLInputElement).type === "checkbox" 
      ? (e.target as HTMLInputElement).checked 
      : e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmittedData(input); // save only on submit
    if (onPlayerRegistered) {
      onPlayerRegistered(input); // Call the callback to add player to list
      // Clear the form after successful registration
      setTimeout(() => {
        setInput({});
        setSubmittedData(null);
      }, 1000);
    }
  }

  function handleReset() {
    setInput({});
    setSubmittedData(null); // also hide output
  }

  return (
    <div className="player-registration-container">
      <div className="player-registration-form">
        <div>
          <h3 className="registor_form">Player Registration Forms</h3>
        </div>
        <form onSubmit={handleSubmit}>
        <div>
          <label>
            Player Fullname:
            <input
              type="text"
              name="fullname"
              value={input.fullname}
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
              value={input.email}
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
              value={input.address}
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
              value={input.DateOfBirth}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            age:
            <input
              type="number"
              name="age"
              value={input.age}
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
              value={input.JerseyNo}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            HEIGHT:
            <input
              type="number"
              name="height"
              value={input.height}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label><b>Role:</b></label>
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
          <label><b>Format:</b></label>
          <div className="form-group-radio">
            <label>
              TEST:
              <input
                type="checkbox"
                name="test"
                checked={input.test}
                onChange={handleChange}
              />
            </label>
            <label>
              ODI:
              <input
                type="checkbox"
                name = "odi"
                checked={input.odi}
                onChange={handleChange}
              />
            </label>
            <label>
              T20:
              <input
                type="checkbox"
                name = "t20"
                checked={input.t20}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <button type="submit">Submit</button>
          <button type="reset" onClick={handleReset}>
            Reset
          </button>
        </div>

        <br />
        <br />
        <div className="player-details-container">
          {submittedData && (
            <>
              <h4>Player Details</h4>
              <p>Full Name: {submittedData.fullname}</p>
              <p>Email: {submittedData.email}</p>
              <p>Phone No.: {submittedData.PhoneNo}</p>
              <p>Address: {submittedData.address}</p>
              <p>Date of Birth: {submittedData.DateOfBirth}</p>
              <p>Age: {submittedData.age}</p>
              <p>Gender: {submittedData.gender}</p>
              <p>Jersey No.: {submittedData.JerseyNo}</p>
              <p>Height: {submittedData.height}</p>
              <p>Role: {submittedData.role}</p>
              <p>Format: {submittedData.test && 'test'} {submittedData.odi && 'odi'} {submittedData.t20 && 't20'}</p>
          
            </>
          )}
        </div>
      </form>
      </div>
    </div>
  );
}
