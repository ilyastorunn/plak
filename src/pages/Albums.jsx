import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Albums = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "../../public/pics/album1.jpg",
    "../../public/pics/album2.jpg",
    "../../public/pics/album3.jpg",
    "../../public/pics/album4.jpg",
    "../../public/pics/album5.jpg",
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="relative w-full max-w-4xl h-[400px] overflow-hidden">
        <div className="relative w-full h-full">
          {images.map((img, index) => {
            let position = index - currentIndex;

            return (
              <div
                key={index}
                className={`absolute w-full h-full transition-all duration-500 ease-out`}
                style={{
                  transform: `translateX(${position * 85}%) scale(${
                    Math.abs(position) === 0 ? 1 : 0.8
                  })`,
                  zIndex: Math.abs(position) === 0 ? 2 : 1,
                  opacity: Math.abs(position) > 2 ? 0 : 1,
                }}
              >
                <img
                  src={img}
                  alt={`Slide ${index}`}
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>
            );
          })}
        </div>
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      <div className="flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex === index ? "bg-purple-600 w-4" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Albums;
