import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PetNameScreen from "./components/screens/PetNameScreen";
import LocationScreen from "./components/screens/LocationScreen";
import SummaryScreen from "./components/screens/SummaryScreen";

function App() {
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
