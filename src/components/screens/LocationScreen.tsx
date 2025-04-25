import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Map from "../../Map";
import { useDispatch } from "react-redux";
import { setPetLocation } from "../../app/store/slices/petSlice";
import cat from "../../assets/cat.gif";

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
      <div className={"location-screen-title"}>
      <h2>{`WHERE THE HECK IS ${state.petName.toUpperCase()}?`}</h2>
      <button className="location-btn" onClick={handleSaveLocation} disabled={!selectedLocation}>
        {"->"}
      </button>
      </div>
      <div className="map-container">
      <img src={cat} width={200} />
      <div style={{ width: "50%"}}>
      <Map
        center={center}
        onLocationSelect={(location) => setSelectedLocation(location)}
      />
      </div>
      </div>
    </div>
  );
};

export default LocationScreen;
