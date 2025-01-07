import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import {
  IoPlayOutline,
  IoPlayBackOutline,
  IoPlayForwardOutline,
  IoReturnDownBackOutline,
} from "react-icons/io5";

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

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-customWhite p-8">
      <Link
        to="/albums"
        className="absolute top-8 left-8 text-customblack hover:text-customgray transition-colors"
      >
        <div className="relative">
          <span>Albums</span>
          <IoReturnDownBackOutline className="w-6 h-6 absolute -bottom-4 -right-0" />
        </div>
      </Link>
      <div className="bg-[#FAF9F6] rounded-lg shadow-lg px-8 pb-8 pt-4">
        <div className="w-full max-w-md">
          <div className="relative mb-8">
            <div className="aspect-square relative">
              {/* <img src={album.src} alt={`${album.name} bt ${album.artist}`} /> */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`w-[95%] h-[95%] rounded-full bg-customgray shadow-lg transition-transform duration-1000
                  ${isPlaying ? "animate-spin-slow" : "rotate-0"}`}
                >
                  <div className="absolute inset-0 rounded-full overflow-hidden opacity-100">
                    <img
                      src={album.src}
                      alt="Vinyl texture"
                      className="w-full h-full object cover"
                    />
                  </div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[15%] h-[15%] rounded-full bg-customblack">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[20%] h-[20%] rounded-full bg-customgray" />
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
        {/* <div className="bg-white rounded-lg shadow-lg p-8"> //jjj */}
        <h2 className="text-2xl text-customblack mb-2">
          {album.albumName}
        </h2>
        <h3 className="text-lg font-thin text-customgray mb-6">{album.artist}</h3>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-customgray">
            {formatTime(currentTime)}
          </span>
          <div className="w-full mx-4 bg-zinc-200 rounded-full h-1">
            <div
              className="bg-customblack h-1 rounded-full transition-all duration-200"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <span className="text-sm text-customgray">{formatTime(duration)}</span>
        </div>
        <div className="controls flex items-center justify-center gap-4 mt-4">
          <button
            onClick={() => console.log("Previous")}
            className="prev-button"
          >
            <IoPlayBackOutline className="w-8 h-8 text-customblack" />
          </button>
          <button onClick={handlePlayPause} className="play-pause-button">
            <IoPlayOutline className="w-8 h-8 text-customblack" />
          </button>
          <button onClick={() => console.log("Next")} className="next-button">
            <IoPlayForwardOutline className="w-8 h-8 text-customblack" />
          </button>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Player;
