import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import UserToPetMap from "./UserToPetMap";
import { useDispatch } from "react-redux";
import { clearPet } from "../../app/store/slices/petSlice";
import { haversineDistance } from "../../app/utils/haversine";

const SummaryScreen = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userLatitude, userLongitude } = useAppSelector(
    (state) => state.location
  );

  const { petLatitude, petLongitude } = useAppSelector(
    (state) => state.pet
  );

  const { petName } = useAppSelector(
    (state) => state.pet
  );

  const [distance, setDistance] = useState<number | null>(null);


  useEffect(() => {
    const calculatedDistance = haversineDistance(
      userLatitude,
      userLongitude,
      petLatitude,
      petLongitude
    );
    setDistance(calculatedDistance);
  }, [userLatitude, userLongitude, petLatitude, petLongitude]);

  // Convert km to inches
  const kmToInches = (distanceInKm: number) => {
    return distanceInKm * 1000 * 39.3701; // Convert km to inches
  };

  const unitConversions: { [key: string]: number } = {
    kilometers: 39370.1,
    meters: 39.3701,
    worms: 3.5,
    whiskers: 5,
    paws: 2.45,
  };

  const unit = state.unit || "kilometers"; // Default to kilometers if no unit provided
  const distanceInInches = distance ? kmToInches(distance) : 0;
  const conversionFactor = unitConversions[unit]; // Get conversion factor for selected unit
  const distanceInSelectedUnit = (distanceInInches / conversionFactor).toFixed(
    2
  );

  const startOver = () => {
    dispatch(clearPet());
    navigate("/");
  }

  return (
    <div>
      <h2>Summary</h2>
      <p>Pet Name: {state.petName}</p>
      <p>
        Location: {state.location.lat}, {state.location.lng}
      </p>
      <p>
        You are {distanceInSelectedUnit} {unit} away from {petName}!
      </p>
      <button onClick={startOver}>Start Over</button>
      <UserToPetMap />
    </div>
  );
};

export default SummaryScreen;
