import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import Albums from "./pages/Albums";
import Slider from "./components/Slider";
import ImageSlider from "./components/ImageSlider";

function App() {
  return (
    <div className="bg-[#F5EDF0]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/albums" element={<ImageSlider />} />
        </Routes>
      </BrowserRouter>
      {/* <LandingPage />
      <Albums /> */}
      {/* <Slider /> */}
    </div>
   
  );
}

export default App;
