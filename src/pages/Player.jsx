import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

const images = [
  {
    src: "../../public/pics/album1.jpg",
    artist: "The Chocolate Jam Co",
    albumName: "The Speed of Earth",
  },
  {
    src: "../../public/pics/album2.jpg",
    artist: "Mieko Hirota",
    albumName: "A Woman Am I",
  },
  {
    src: "../../public/pics/album3.jpg",
    artist: "Cappuccino",
    albumName: "I Can't Explain",
  },
  {
    src: "../../public/pics/album4.jpg",
    artist: "Sai Hsai Mao",
    albumName: "Build A Hospital For Broken Hearts",
  },
  {
    src: "../../public/pics/album5.jpg",
    artist: "Ernest Ranglin",
    albumName: "Surfin",
  },
  {
    src: "../../public/pics/album6.jpg",
    artist: "Valerie Cizmarova",
    albumName: "Padal Dest",
  },
  {
    src: "../../public/pics/album7.jpg",
    artist: "Hiromasa Suzuki",
    albumName: "High Flying",
  },
  {
    src: "../../public/pics/album8.jpg",
    artist: "Ансамбль Иверия",
    albumName: "Тема Аэта",
  },
  {
    src: "../../public/pics/album9.jpg",
    artist: "Kimiko Kasai",
    albumName: "Unfinished Life",
  },
];

const Player = () => {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180);

  const album = images[id];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prevTime + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-customWhite p-8">
      <Link
        to="/albums"
        className="absolute top-8 left-8 text-customblack hover:text-customgray transition-colors"
      >
        Back to Albums
      </Link>
      <div className="w-full max-w-md">
        <div className="relative mb-8">
          {/* <div className="flex justify-center items-center h-full">
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full overflow-hidden z-0 transition-all duration-1000 ease-in-out opacity-100 scale-100">
              <div className="w-full h-full relative animate-spin-slow">
                <img
                  src={album.src}
                  alt={`${album.name} by ${album.artist}`}
                  />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full bg-zinc-900">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-zinc-700" />
                </div>
              </div>
            </div>
          </div> */}
          <div className="aspect-square relative">
            {/* <img src={album.src} alt={`${album.name} bt ${album.artist}`} /> */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-[95%] h-[95%] rounded-full bg-customgray shadow-lg transition-transform duration-1000 animate-spin-slow"
              >
                <div className="absolute inset-0 rounded-full overflow-hidden opacity-40">
                  <img
                    src={album.src}
                    alt="Vinyl texture"
                    className="w-full h-full object cover"
                  />
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[15%] h-[15%] rounded-full bg-zinc-800">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[20%] h-[20%] rounded-full bg-zinc-600" />
                </div>
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-full border border-zinc-800"
                    style={{
                      margin: `${(i + 1) * 8}%`,
                      opacity: 1 - i * 0.1,
                    }}
                  />
                ))}
              </div>
            </div>
          </div> */
        </div>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-zinc-800 mb-2">
            {album.albumName}
          </h2>
          <h3 className="text-lg text-zinc-600 mb-6">{album.artist}</h3>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-zinc-500">
              {formatTime(currentTime)}
            </span>
            <div className="w-full mx-4 bg-zinc-200 rounded-full h-1">
              <div
                className="bg-zinc-800 h-1 rounded-full transition-all duration-200"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <span className="text-sm text-zinc-500">
              {formatTime(duration)}
            </span>
          </div>
          <div className="flex justify-center">
            <button
              onClick={togglePlay}
              className="bg-zinc-800 text-white rounded-full w-16 h-16 flex items-center justify-center focus:outline-none hover:bg-zinc-700 transition-colors"
            >
              {isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
