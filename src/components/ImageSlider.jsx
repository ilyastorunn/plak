import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import images from "../data/images";
import Footer from "./Footer";

const ImageSlider = () => {
  const [selectedIndex, setSelectedIndex] = useState(2); // Başlangıçta merkezi albüm
  const [vinylVisible, setVinylVisible] = useState(true);
  const navigate = useNavigate();

  // Sağa veya sola kaydırma fonksiyonu
  const moveToSelected = (direction) => {
    setVinylVisible(false);
    setTimeout(() => {
      if (direction === "next") {
        setSelectedIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      } else if (direction === "prev") {
        setSelectedIndex((prevIndex) =>
          prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
      }
      setVinylVisible(true);
    }, 500);
  };

  // Albümlerin pozisyon ve boyut sınıflarını belirler
  const getStyles = (index) => {
    const total = images.length;
    const difference = (index - selectedIndex + total) % total;

    if (difference === 0) return "selected";
    if (difference === 1) return "next";
    if (difference === total - 1) return "prev";
    if (difference === 2) return "nextRightSecond";
    if (difference === total - 2) return "prevLeftSecond";
    return "hidden";
  };

  return (
    <>
      <div className="bg-[#F5EDF0] min-h-screen flex flex-col justify-center items-center relative overflow-hidden px-8 pb-8">
        {/* Header */}
        <div className="absolute top-4 left-4">
          <h1 className="font-Magtis text-[36px] sm:text-[32px] font-extrabold text-customgray">"plak"</h1>
          <p className="font-Magtis text-[16px] font-bold text-customgray mt-2">pick a song</p>
        </div>

        {/* Image Slider */}
        <div className="relative h-[400px] sm:h-[300px] w-full max-w-[1000px] flex justify-center items-center mx-auto">
          {images.map((img, index) => {
            const className = getStyles(index);
            return (
              <div
                key={index}
                className={`absolute transition-all duration-500 cursor-pointer ${className}`}
                onClick={() => setSelectedIndex(index)}
              >
                <div className="relative">
                  {className === "selected" && (
                    <div
                      className={`vinyl absolute left-1/2 -translate-x-1/2 top-0 w-[200px] sm:w-[120px] h-[200px] sm:h-[120px] rounded-full overflow-hidden z-10 ${
                        vinylVisible
                          ? "opacity-100 scale-100 -translate-y-[45%] sm:-translate-y-[30%]"
                          : "opacity-0 scale-80 translate-y-0"
                      }`}
                    >
                      <img
                        src={img.src}
                        alt={`Vinyl for ${img.albumName}`}
                        className="w-full h-full object-cover animate-spin-slow"
                      />
                    </div>
                  )}
                  <img
                    src={img.src}
                    alt={`Album cover for ${img.albumName}`}
                    className={`${
                      className === "selected"
                        ? "w-[300px] sm:w-[180px] h-[300px] sm:h-[180px]"
                        : "w-[200px] sm:w-[120px] h-[200px] sm:h-[120px]"
                    } rounded-md shadow-md`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute w-full flex justify-between items-center px-4 sm:px-8">
          <button
            className="text-zinc-600 hover:text-customorange transition duration-300"
            onClick={() => moveToSelected("prev")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            className="text-zinc-600 hover:text-customorange transition duration-300"
            onClick={() => moveToSelected("next")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Album Info */}
        <div className="text-center mt-4">
          <p className="text-lg sm:text-[16px] font-medium text-zinc-800">Hiromasa Suzuki</p>
          <p className="text-base sm:text-[14px] font-normal text-zinc-500 mt-1">High Flying</p>
        </div>

        {/* Listen Button */}
        <button
          className="mt-3 w-[120px] sm:w-[80px] h-[40px] sm:h-[28px] bg-gradient-to-r from-customorange to-customgray text-[14px] font-medium text-customWhite rounded-md"
          onClick={() => navigate(`/player/${selectedIndex}`)}
        >
          Listen
        </button>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default ImageSlider;