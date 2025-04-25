import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PetNameScreen = () => {
  const [petName, setPetName] = useState("");
  const [unit, setUnit] = useState("miles");
  const navigate = useNavigate();

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (petName) {
      navigate(`/location`, { state: { petName, unit } });
    }
  };

  const units = ["miles", "kilometers", "worms", "whiskers", "toenail clippings"];

  return (
    <div>
      <h2>Enter your pet's name</h2>
      <form onSubmit={handleNameSubmit}>
        <input
          type="text"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          placeholder="Enter pet's name"
        />
        <br />
        <label htmlFor="unit">Choose a unit of measurement:</label>
        <br />
        <select id="unit" value={unit} onChange={(e) => setUnit(e.target.value)}>
          {units.map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
        <br />
        <button type="submit" disabled={!petName}>Next</button>
      </form>
    </div>
  );
};

export default PetNameScreen;
