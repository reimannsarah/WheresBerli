import { GoogleMap, LoadScript, Marker, Autocomplete } from "@react-google-maps/api";
import { useState, useCallback, useRef } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194,
};

const Map = () => {
  const [center, setCenter] = useState<{ lat: number; lng: number }>(defaultCenter);
  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry?.location) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setCenter(location);
        setMarkers([...markers, location]);
      }
    }
  };

  const handleLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const handleClick = useCallback((event: google.maps.MapMouseEvent) => {
    const latLng = event.latLng;
    if (!latLng) return;
    setMarkers((current) => [...current, { lat: latLng.lat(), lng: latLng.lng() }]);
  }, []);

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
    >
      <div style={{ marginBottom: "1rem" }}>
        <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
          <input
            type="text"
            placeholder="Search for a place"
            style={{ width: "300px", height: "40px", fontSize: "16px", padding: "0 10px" }}
          />
        </Autocomplete>
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onClick={handleClick}
      >
        {markers.map((position, index) => (
          <Marker key={index} position={position} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
