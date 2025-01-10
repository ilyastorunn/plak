import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const images = [
  {
    src: "../../public/pics/album1.jpg",
    artist: "The Chocolate Jam Co",
    albumName: "Mounds",
    sound: "../../public/sounds/album1.mp3",
    relDate: "1979",
    country: "USA 🇺🇸",
    genre: "Jazz",
    album: "The Spread Of The Future",
  },
  {
    src: "../../public/pics/album2.jpg",
    artist: "Mieko Hirota",
    albumName: "A Woman Am I",
    sound: "../../public/sounds/album2.mp3",
    relDate: "1978",
    country: "Japan 🇯🇵",
    genre: "Jazz-Funk",
    album: "Step Across",
  },
  {
    src: "../../public/pics/album3.jpg",
    artist: "Cappuccino",
    albumName: "I Can't Explain",
    sound: "../../public/sounds/album3.mp3",
    relDate: "1976",
    country: "Italy 🇮🇹",
    genre: "Funk/Soul",
    album: "Cappuccino",
  },
  {
    src: "../../public/pics/album4.jpg",
    artist: "Sai Hsai Mao",
    albumName: "Build A Hospital For Broken Hearts",
    sound: "../../public/sounds/album4.mp3",
    relDate: "1976",
    country: "Burma 🇲🇲",
    genre: "Psych Jazz",
    album: "unknown",
  },
  {
    src: "../../public/pics/album5.jpg",
    artist: "Ernest Ranglin",
    albumName: "Surfin'",
    sound: "../../public/sounds/album5.mp3",
    relDate: "1996",
    country: "USA 🇺🇸",
    genre: "Reggae",
    album: "Surfin",
  },
  {
    src: "../../public/pics/album6.jpg",
    artist: "Valerie Čižmárová",
    albumName: "Padal Dest",
    sound: "../../public/sounds/album6.mp3",
    relDate: "1974",
    country: "Czechoslovakia 🇨🇿",
    genre: "Funk/Soul",
    album: "Valerie Čižmárová",
  },
  {
    src: "../../public/pics/album7.jpg",
    artist: "Hiromasa Suzuki",
    albumName: "High Flying",
    sound: "../../public/sounds/album7.mp3",
    relDate: "1976",
    country: "Japan 🇯🇵",
    genre: "Electronic Jazz",
    album: "High Flying",
  },
  {
    src: "../../public/pics/album8.jpg",
    artist: "Ансамбль Иверия",
    albumName: "Тема Аэта",
    sound: "../../public/sounds/album8.mp3",
    relDate: "1987",
    country: "USSR ☭",
    genre: "Jazz",
    album: "unknown",
  },
  {
    src: "../../public/pics/album9.jpg",
    artist: "Kimiko Kasai",
    albumName: "やりかけの人生 (Unfinished Life)",
    sound: "../../public/sounds/album9.mp3",
    relDate: "1977",
    country: "Japan 🇯🇵",
    genre: "Jazz",
    album: "バイブレイション (Love Celebration)",
  },
];

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
    setSelectedIndex(index);
    navigate(`/player/${index}`);
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
    <div className="bg-[#F5EDF0] min-h-screen flex flex-col justify-center items-center relative overflow-hidden p-8">
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
                            ? "opacity-100 scale-100 -translate-y-[45%]"
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
                      <div className="pt-5 pl-4 absolute inset-0 flex bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 z-20">
                        <div className="text-customWhite text-base font-Lora">
                          <div className="flex">
                            <p className="font-medium mb-2">Album:</p>
                            <p>{img.album}</p>
                          </div>
                          <div className="flex">
                            <p className="font-medium mb-2">Release Date:</p>
                            <p>{img.relDate}</p>
                          </div>
                          <div className="flex">
                            <p className="font-medium mb-2">Country:</p>
                            <p>{img.country}</p>
                          </div>
                          <div className="flex">
                            <p className="font-medium">Genre:</p>
                            <p> {img.genre}</p>
                          </div>
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
                    <p className="text-base font-Lora text-zinc-500 font-light">
                      {img.albumName}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-center bottom-10 pt-4">
        <button
          className="mt-4 px-4 py-2 bg-customblack text-customWhite rounded-full text-sm font-Inter hover:bg-customorange transition-colors duration-500"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/player/${selectedIndex}`);
          }}
        >
          Play Album
        </button>
      </div>
      <div className="absolute w-full top-1/2 -translate-y-1/2 flex justify-between box-border pointer-events-none z-40 max-w-[1200px] px-8">
        <button
          className="text-zinc-600 hover:text-customorange border-none bg-transparent transition-colors duration-300 pointer-events-auto"
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
          className="text-zinc-600 hover:text-customorange border-none bg-transparent transition-colors duration-300 pointer-events-auto"
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
  );
};

export default ImageSlider;
