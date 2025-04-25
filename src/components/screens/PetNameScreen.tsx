import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PetNameScreen = () => {
  const [petName, setPetName] = useState("");
  const navigate = useNavigate();

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (petName) {
      navigate(`/location`, { state: { petName } });
    }
  };

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
        <button type="submit" disabled={!petName}>Next</button>
      </form>
    </div>
  );
};

export default PetNameScreen;
