import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPetName } from "../../app/store/slices/petSlice";

const PetNameScreen = () => {
  const [petName, setPetNameState] = useState("");
  const [unit, setUnit] = useState("miles");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (petName) {
      dispatch(setPetName(petName));
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
          onChange={(e) => setPetNameState(e.target.value)}
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
