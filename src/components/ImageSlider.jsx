import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import images from "../data/images";
import Footer from "./Footer";

const ImageSlider = () => {
  const [selectedIndex, setSelectedIndex] = useState(3);
  const [vinylVisible, setVinylVisible] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

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
      setTimeout(() => setVinylVisible(true), 100);
    }, 500);
  };

  useEffect(() => {
    setVinylVisible(true);
  }, []);

  const getClassName = (index) => {
    const total = images.length;
    const difference = (index - selectedIndex + total) % total;

    if (difference === 0) return "selected";
    if (difference === 1) return "next";
    if (difference === 2) return "nextRightSecond";
    if (difference === total - 1) return "prev";
    if (difference === total - 2) return "prevLeftSecond";
    return difference < total / 2 ? "hideRight" : "hideLeft";
  };

  const getStyles = (className) => {
    switch (className) {
      case "selected":
        return "z-30 translate-x-0 translate-y-0 scale-100 hover:scale-[1.02] transition-transform duration-300";
      case "next":
        return "z-20 translate-x-[240px] translate-y-[-10px] scale-[0.65] hover:scale-[0.67] transition-transform duration-300";
      case "nextRightSecond":
        return "z-10 translate-x-[380px] translate-y-[-20px] scale-[0.5] hover:scale-[0.52] transition-transform duration-300";
      case "prev":
        return "z-20 translate-x-[-240px] translate-y-[-10px] scale-[0.65] hover:scale-[0.67] transition-transform duration-300";
      case "prevLeftSecond":
        return "z-10 translate-x-[-380px] translate-y-[-20px] scale-[0.5] hover:scale-[0.52] transition-transform duration-300";
      default:
        return "opacity-0 translate-x-0 scale-0";
    }
  };

  const handleAlbumClick = (index) => {
    if (index === selectedIndex) {
      navigate(`/player/${index}`);
    } else {
      setVinylVisible(false);
      setTimeout(() => {
        setSelectedIndex(index);
        setVinylVisible(true);
      }, 500);
    }
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const getBlurClass = (index) => {
    return index === selectedIndex && hoveredIndex === index ? "blur-xs" : "";
  };

  return (
    <>
      <div className="bg-[#F5EDF0] min-h-screen flex flex-col justify-center items-center relative overflow-hidden px-8 pb-8">
        <div className="absolute top-4 left-4 z-50 pl-2 pt-2">
          <Link
            to="/"
            className="font-Magtis text-5xl font-extrabold text-customgray hover:text-customorange transition-colors duration-500"
          >
            "plak"
          </Link>
          <p className="font-Magtis font-bold text-customgray mt-2 pl-5">
            pick a song
          </p>
        </div>
        <div className="relative h-[400px] w-full max-w-[1000px] flex justify-center items-center mx-auto">
          <div className="relative w-full flex justify-center items-center">
            {images.map((img, index) => {
              const className = getClassName(index);
              const isSelected = className === "selected";
              return (
                <div
                  key={index}
                  className={`absolute transition-all duration-500 cursor-pointer ${getStyles(
                    className
                  )}`}
                  onClick={() => handleAlbumClick(index)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="relative">
                    {isSelected && (
                      <div
                        className={`vinyl absolute left-1/2 -translate-x-1/2 top-0 w-[200px] h-[200px] rounded-full overflow-hidden z-0 transition-all duration-1000 ease-in-out
                      ${
                        vinylVisible
                          ? "opacity-100 scale-100 -translate-y-[45%] shadow-lg"
                          : "opacity-0 scale-80 translate-y-0"
                      }`}
                      >
                        <div className="w-full h-full relative animate-spin-slow">
                          <img
                            src={img.src}
                            alt={`Vinyl for ${img.albumName}`}
                            className="w-full h-full object-cover opacity-90"
                          />
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full bg-zinc-900">
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-zinc-700" />
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="relative">
                      <img
                        src={img.src}
                        alt={`Album cover for ${img.albumName}`}
                        className={`w-[300px] h-[300px] rounded-sm transition-all duration-500 object-cover relative z-10 ring-1 ring-black/5 ${getBlurClass(
                          index
                        )}`}
                      />
                      {isSelected && (
                        <div className="pt-5 px-6 absolute inset-0 flex flex-col bg-customgray/50 rounded-lg shadow-md opacity-0 hover:opacity-100 transition-opacity duration-300 z-20">
                          <div className="text-customWhite text-sm font-Lora space-y-2">
                            <p className="font-semibold">Album:&nbsp;</p>
                            <span className="font-normal">
                              {img.album}&nbsp;
                            </span>
                            <span className="font-normal">
                              ({img.albumForeignLang})
                            </span>
                            <p className="font-semibold">Release Date:&nbsp;</p>
                            <span className="font-normal">{img.relDate}</span>
                            <p className="font-semibold">Country:&nbsp;</p>
                            <span className="font-normal">{img.country}</span>
                            <p className="font-semibold">Genre:&nbsp;</p>
                            <span className="font-normal">{img.genre}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="absolute -bottom-16 left-0 w-full text-center z-20 transition-all duration-300">
                      <p className="text-lg font-Lora font-medium mb-1 text-zinc-800">
                        {img.artist}
                      </p>
                      <p className="text-base font-Lora text-zinc-500 font-light space-y-1">
                        {img.albumName}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-center justify-center bottom-0 mt-10">
          <button
            className="px-5 py-2 text-customWhite rounded-lg bg-gradient-to-r from-customorange to-customgray text-md font-Inter hover:translate-y-[-2px] transition-transform duration-300 shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/player/${selectedIndex}`);
            }}
          >
            Listen
          </button>
        </div>
        <div className="absolute w-full flex justify-between items-center max-w-[1000px] mx-auto">
          <button
            className="text-zinc-600 hover:text-customorange border-none bg-transparent transition-colors duration-300 -translate-x-16"
            onClick={() => moveToSelected("prev")}
            aria-label="Previous image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
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
            className="text-zinc-600 hover:text-customorange border-none bg-transparent transition-colors duration-300 translate-x-16"
            onClick={() => moveToSelected("next")}
            aria-label="Next image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
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
      </div>
      <Footer />
    </>
  );
};

export default ImageSlider;
