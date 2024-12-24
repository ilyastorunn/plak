import React, { useState } from "react";
import "../styles/Slider.css";

// Import images
import album1 from "../../public/pics/album1.jpg";
import album2 from "../../public/pics/album2.jpg";
import album3 from "../../public/pics/album3.jpg";
import album4 from "../../public/pics/album4.jpg";
import album5 from "../../public/pics/album5.jpg";
import album6 from "../../public/pics/album6.jpg";
import album7 from "../../public/pics/album7.jpg";
import album8 from "../../public/pics/album8.jpg";
import album9 from "../../public/pics/album9.jpg";

const images = [
  { src: album1, artist: "The Chocolate Jams", albumName: "Mounds" },
  { src: album2, artist: "Mieko Hirota", albumName: "A Woman Am I" },
  { src: album3, artist: "Cappuccino", albumName: "I Can't Explain" },
  {
    src: album4,
    artist: "Sai Hsai Mao",
    albumName: "Build A Hospital For Broken Hearts",
  },
  { src: album5, artist: "Ernest Ranglin", albumName: "Surfin" },
  { src: album6, artist: "Valerie Cizmarova", albumName: "Padal Dest" },
  { src: album7, artist: "Hiromasa Suzuki", albumName: "High Flying" },
  { src: album8, artist: "Ансамбль Иверия", albumName: "Тема Аэта" },
  { src: album9, artist: "Kimiko Kasai", albumName: "Unfinished Life" },
];

const Slider = () => {
  const [selectedIndex, setSelectedIndex] = useState(3);

  const moveToSelected = (direction) => {
    if (direction === "next") {
      setSelectedIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    } else if (direction === "prev") {
      setSelectedIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }
  };

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

  return (
    <div className="carousel-container">
      <div id="carousel">
        {images.map((img, index) => {
          const className = getClassName(index);
          return (
            <div
              key={index}
              className={className}
              onClick={() => setSelectedIndex(index)}
            >
              <img src={img.src} alt={`carousel-${index}`} />
              {className === "selected" && (
                <div className="album-info">
                  <p className="artist">{img.artist}</p>
                  <p className="album-name">{img.albumName}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="buttons">
        <button
          className="prev-button text-customgray hover:text-customorange text-4xl border-none bg-transparent transition-all duration-300 hover:scale-125"
          onClick={() => moveToSelected("prev")}
        >
          &#8249;
        </button>
        <button
          className="next-button text-customgray hover:text-customorange text-4xl border-none bg-transparent transition-all duration-300 hover:scale-125"
          onClick={() => moveToSelected("next")}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Slider;
