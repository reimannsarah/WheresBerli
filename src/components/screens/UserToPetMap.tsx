import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import { useAppSelector } from "../../app/hooks";
import { useCallback, useMemo, useRef } from "react";
import berli from "../../assets/tinyBerli.png"

const containerStyle = {
  width: "100%",
  height: "400px",
};

// Pale map style (from Snazzy Maps)
const mapStyle = [
  { elementType: "geometry", stylers: [{ color: "#ebe3cd10" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#52373510" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#f5f1e610" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#c9c9c910" }],
  },
];

const UserToPetMap = () => {
  const userLat = useAppSelector((state) => state.location.userLatitude);
  const userLng = useAppSelector((state) => state.location.userLongitude);
  const petLat = useAppSelector((state) => state.pet.petLatitude);
  const petLng = useAppSelector((state) => state.pet.petLongitude);
  const { petName } = useAppSelector((state) => state.pet);

  const userLocation = useMemo(() => ({ lat: userLat ?? 0, lng: userLng ?? 0 }), [userLat, userLng]);
  const petLocation = useMemo(() => ({ lat: petLat ?? 0, lng: petLng ?? 0 }), [petLat, petLng]);

  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(userLocation);
    bounds.extend(petLocation);
    map.fitBounds(bounds, 50);
  }, [userLocation, petLocation]);

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        onLoad={onLoad}
        center={userLocation}
        zoom={4}
        options={{ styles: mapStyle, disableDefaultUI: true }}
      >
        <Marker position={userLocation} label="You" />
        <Marker position={petLocation} label={petName} icon={berli} />
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
