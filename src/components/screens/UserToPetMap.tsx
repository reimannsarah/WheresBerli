import { useAppSelector } from "../../app/hooks";
import { haversineDistance } from "../../app/utils/haversine";

const getCardinalDirection = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const angle = Math.atan2(dLon, dLat) * (180 / Math.PI);
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(((angle + 360) % 360) / 45) % 8;

  return directions[index];
};

const UserToPetMap = () => {
  const userLat = useAppSelector((state) => state.location.userLatitude);
  const userLng = useAppSelector((state) => state.location.userLongitude);
  const petLat = useAppSelector((state) => state.pet.petLatitude);
  const petLng = useAppSelector((state) => state.pet.petLongitude);
  const { petName } = useAppSelector((state) => state.pet);

  const distance = haversineDistance(userLat, userLng, petLat, petLng); // Distance between user and pet
  const direction = getCardinalDirection(petLat, petLng, userLat, userLng); // Cardinal direction from pet to user

  // Calculate the angle between pet and user for line direction
  const angle = Math.atan2(userLng - petLng, userLat - petLat) * (180 / Math.PI); // Angle for line rotation

  // Calculate user position based on angle and distance
  const userOffsetX = distance * Math.cos(angle * (Math.PI / 180)) * 10; // X offset based on angle and distance
  const userOffsetY = distance * Math.sin(angle * (Math.PI / 180)) * 10; // Y offset based on angle and distance

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "600px",
        backgroundColor: "#ebe3cd",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Pet Pin in the center */}
      <div
        style={{
          position: "absolute",
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          backgroundColor: "#FF5733",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "12px",
        }}
      >
        {petName}
      </div>

      {/* Line from Pet to User */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: `${distance * 10}px`, // Scale the distance for visualization
          height: "2px", // Line thickness
          backgroundColor: "#FF5733", // Line color
          transformOrigin: "left", // Make sure the line starts from the pet's position
          transform: `rotate(${angle}deg)`, // Rotate the line to point towards the user
        }}
      />

      {/* User Pin at the end of the line */}
      <div
        style={{
          position: "absolute",
          top: `calc(50% + ${userOffsetY}px - 15px)`, // Adjust top so user pin is centered on the line end
          left: `calc(50% + ${userOffsetX}px - 15px)`, // Adjust left so user pin is centered on the line end
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          backgroundColor: "#33FF57",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "12px",
        }}
      >
        You
      </div>

      {/* Display the direction and distance */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          backgroundColor: "white",
          padding: "5px",
          borderRadius: "5px",
          fontSize: "14px",
        }}
      >
        Direction: {direction}
        <br />
        Distance: {distance.toFixed(2)} km
      </div>
    </div>
  );
};

export default UserToPetMap;
