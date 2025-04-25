import {
  GoogleMap,
  LoadScript,
  OverlayView,
  Polyline,
} from "@react-google-maps/api";
import { useAppSelector } from "../../app/hooks";
import { useMemo } from "react";

// Custom map style
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

const containerStyle = {
  width: "100%",
  height: "400px",
};

const getCardinalDirection = (from: google.maps.LatLngLiteral, to: google.maps.LatLngLiteral) => {
  const dLat = to.lat - from.lat;
  const dLng = to.lng - from.lng;

  const angle = Math.atan2(dLng, dLat) * (180 / Math.PI);
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(((angle + 360) % 360) / 45) % 8;

  return directions[index];
};

const SvgLabel = ({ label }: { label: string }) => (
  <svg width="60" height="60" viewBox="0 0 60 60">
    <circle cx="30" cy="30" r="20" fill="#FF5733" opacity={0.8} />
    <text x="30" y="35" fontSize="14" fill="white" textAnchor="middle">
      {label}
    </text>
  </svg>
);

const UserToPetMap = () => {
  const userLat = useAppSelector((state) => state.location.userLatitude);
  const userLng = useAppSelector((state) => state.location.userLongitude);
  const petLat = useAppSelector((state) => state.pet.petLatitude);
  const petLng = useAppSelector((state) => state.pet.petLongitude);
  const { petName } = useAppSelector((state) => state.pet);

  const userLocation = useMemo(() => ({ lat: userLat ?? 0, lng: userLng ?? 0 }), [userLat, userLng]);
  const petLocation = useMemo(() => ({ lat: petLat ?? 0, lng: petLng ?? 0 }), [petLat, petLng]);

  const direction = getCardinalDirection(petLocation, userLocation);

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={petLocation}
        zoom={10}
        options={{
          styles: mapStyle,
          disableDefaultUI: true,
          gestureHandling: "greedy",
        }}
      >
        <OverlayView position={userLocation} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
          <SvgLabel label="You" />
        </OverlayView>
        <OverlayView position={petLocation} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
          <SvgLabel label={petName} />
        </OverlayView>

        <Polyline
          path={[petLocation, userLocation]}
          options={{
            strokeOpacity: 0,
            icons: [
              {
                icon: {
                  path: "M 0,-1 0,1",
                  strokeOpacity: 1,
                  strokeColor: "#FF5733",
                  scale: 4,
                },
                offset: "0",
                repeat: "20px",
              },
            ],
          }}
        />
        {/* Optional: Direction label */}
        {/* Could also show this as a tooltip, or text on the line mid-point */}
        {/* <OverlayView position={midpoint(petLocation, userLocation)}><div>{direction}</div></OverlayView> */}
      </GoogleMap>
    </LoadScript>
  );
};

export default UserToPetMap;
