import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Map from "../../Map";
import { useDispatch } from "react-redux";
import { setPetLocation } from "../../app/store/slices/petSlice";

const LocationScreen = () => {
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 37.7749,
    lng: -122.4194,
  });

  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, []);

  const handleSaveLocation = () => {
    dispatch(setPetLocation({ latitude: selectedLocation!.lat, longitude: selectedLocation!.lng }));
    if (selectedLocation) {
      navigate(`/summary`, {
        state: {
          petName: state.petName,
          location: selectedLocation,
          unit: state.unit,
        },
      });
    }
  };

  return (
    <div>
      <h2>{`Select a location for ${state.petName}`}</h2>
      <Map
        center={center}
        onLocationSelect={(location) => setSelectedLocation(location)}
      />
      <button onClick={handleSaveLocation} disabled={!selectedLocation}>
        Save Location
      </button>
    </div>
  );
};

export default LocationScreen;
