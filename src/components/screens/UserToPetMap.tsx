import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import { useAppSelector } from "../../app/hooks";

const containerStyle = {
  width: "100%",
  height: "400px",
};

// Pale map style (from Snazzy Maps)
const mapStyle = [
  { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#f5f1e6" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#c9c9c9" }],
  },
];

const UserToPetMap = () => {
  const userLat = useAppSelector((state) => state.location.userLatitude);
  const userLng = useAppSelector((state) => state.location.userLongitude);
  const petLat = useAppSelector((state) => state.pet.petLatitude);
  const petLng = useAppSelector((state) => state.pet.petLongitude);
  const { petName } = useAppSelector((state) => state.pet);

  const userLocation = { lat: userLat ?? 0, lng: userLng ?? 0 };
  const petLocation = { lat: petLat ?? 0, lng: petLng ?? 0 };

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation}
        zoom={4}
        options={{ styles: mapStyle, disableDefaultUI: true }}
      >
        <Marker position={userLocation} label="You" />
        <Marker position={petLocation} label={petName} />
        <Polyline
          path={[userLocation, petLocation]}
          options={{
            strokeColor: "#FF5733",
            strokeOpacity: 1,
            strokeWeight: 3,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default UserToPetMap;
