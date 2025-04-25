import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PetNameScreen from "./components/screens/PetNameScreen";
import LocationScreen from "./components/screens/LocationScreen";
import SummaryScreen from "./components/screens/SummaryScreen";
import { setLocation } from "./app/store/slices/locationSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { store } from "./app/store";

function App() {
  const dispatch = useDispatch();

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(setLocation({ latitude, longitude }));
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  };

  
  useEffect(() => {
    getLocation();
  });

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<PetNameScreen />} />
          <Route path="/location" element={<LocationScreen />} />
          <Route path="/summary" element={<SummaryScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
