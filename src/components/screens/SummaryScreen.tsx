import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import UserToPetMap from "./UserToPetMap";
import { useDispatch } from "react-redux";
import { clearPet } from "../../app/store/slices/petSlice";

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

  const toRadians = useCallback((degrees: number) => (degrees * Math.PI) / 180, []);

  const haversineDistance = useCallback(
    (
      lat1: number,
      lon1: number,
      lat2: number,
      lon2: number
    ) => {
      const R = 6371; // Radius of Earth in km
      const dLat = toRadians(lat2 - lat1);
      const dLon = toRadians(lon2 - lon1);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
          Math.cos(toRadians(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return R * c; // Distance in km
    },
    [toRadians]
  );

  useEffect(() => {
    const calculatedDistance = haversineDistance(
      userLatitude,
      userLongitude,
      petLatitude,
      petLongitude
    );
    setDistance(calculatedDistance);
  }, [userLatitude, userLongitude, petLatitude, petLongitude, haversineDistance]);

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
