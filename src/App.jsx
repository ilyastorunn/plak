import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import Albums from "./pages/Albums";
import Player from "./pages/Player";
import VolumeSlider from "./components/VolumeSlider";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/slider" element={<VolumeSlider />} />
        {/* <Route path="/player" element={<Player />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
