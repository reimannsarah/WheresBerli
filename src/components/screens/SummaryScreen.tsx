import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const SummaryScreen = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [distance, setDistance] = useState<number | null>(null);

  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

  const haversineDistance = (
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
  };

  // Mock user location (this can be replaced with real geolocation logic later)
  const mockUserLocation = {
    lat: 37.7749, // Mocked latitude (San Francisco)
    lng: -122.4194, // Mocked longitude (San Francisco)
  };

  useEffect(() => {
    // Use the mocked user location
    const { lat, lng } = mockUserLocation;
    // Use the haversine formula to calculate the distance
    const calculatedDistance = haversineDistance(
      lat,
      lng,
      state.location.lat,
      state.location.lng
    );
    setDistance(calculatedDistance);
  }, [state.location]);

  // Convert km to inches
  const kmToInches = (distanceInKm: number) => {
    return distanceInKm * 1000 * 39.3701; // Convert km to inches
  };

  // Define unit conversions with appropriate lengths (in inches)
  // Define unit conversions with appropriate lengths (in inches)
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

  return (
    <div>
      <h2>Summary</h2>
      <p>Pet Name: {state.petName}</p>
      <p>
        Location: {state.location.lat}, {state.location.lng}
      </p>
      <p>
        You are {distanceInSelectedUnit} {unit} away from your pet!
      </p>
      <button onClick={() => navigate("/")}>Start Over</button>
    </div>
  );
};

export default SummaryScreen;
