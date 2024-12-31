import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import Albums from "./pages/Albums";
import Player from "./pages/Player";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/player/:id" element={<Player />} />
        </Routes>
      </BrowserRouter>
   
  );
}

export default App;
