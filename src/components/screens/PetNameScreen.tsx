import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPetName } from "../../app/store/slices/petSlice";
import bird from "../../assets/bird.gif"

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

  const units = ["miles", "kilometers", "worms", "whiskers", "paws"];

  return (
    <div>
      <div className="title">WHERE'S BERLI?</div>
      <div>
        <form onSubmit={handleNameSubmit}>
          <div className="input-container">
            <label htmlFor="petName">Pet's Name:</label>
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetNameState(e.target.value)}
              placeholder="Enter pet's name"
            />
          </div>
          <div className="input-container">
          <label htmlFor="unit">Choose a unit of measurement:</label>
          <select
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            {units.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
          </div>
          <img src={bird} alt="bird" width={200} className="bird-gif" />
          <div className="btn-container">
          <button className="big-btn" type="submit" disabled={!petName}>
            Next {"->"}
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PetNameScreen;
