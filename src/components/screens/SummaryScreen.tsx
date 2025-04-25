import { useLocation } from "react-router-dom";
import UserToPetMap from "./UserToPetMap";

const SummaryScreen = () => {
  const { state } = useLocation();

  return (
    <div>
      <h2>Summary</h2>
      <p>Pet Name: {state.petName}</p>
      <p>
        Location: {state.location.lat}, {state.location.lng}
      </p>
      <UserToPetMap />
    </div>
  );
};

export default SummaryScreen;
