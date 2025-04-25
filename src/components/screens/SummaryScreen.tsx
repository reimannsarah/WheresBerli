import { useLocation } from "react-router-dom";

const SummaryScreen = () => {
  const { state } = useLocation();

  return (
    <div>
      <h2>Summary</h2>
      <p>Pet Name: {state.petName}</p>
      <p>
        Location: {state.location.lat}, {state.location.lng}
      </p>
    </div>
  );
};

export default SummaryScreen;
