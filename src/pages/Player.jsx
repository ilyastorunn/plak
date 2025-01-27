import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router";
import LoadingVinyl from "../components/LoadingVinyl";
import images from "../data/images";
import Spotify from "../../public/pics/Spotify-Logo.png";
import Apple from "../../public/pics/apple-logo.png";
import VolumeSlider from "../components/VolumeSlider";
import Footer from "../components/Footer";

const Player = () => {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180);
  const [volume, setVolume] = useState(50);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef(null);
  const album = images[id];

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume / 100;
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, volume]);

  useEffect(() => {
    const audio = audioRef.current;
    const updateTime = () => setCurrentTime(audio.currentTime);
    if (audio) {
      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });
    }
    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", updateTime);
      }
    };
  }, []);

  const handleRewind = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.max(0, audio.currentTime - 10);
    }
  };

  const handleForward = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = e.target.value / 100;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleTimeBarClick = (e) => {
    const audio = audioRef.current;
    if (audio) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickRatio = clickX / rect.width;

      const newTime = clickRatio * audio.duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingVinyl />
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center bg-customWhite p-8">
          <div className="absolute top-[1rem] left-[1rem] z-50">
            <span className="font-Magtis text-[2rem] sm:text-[2.25rem] font-extrabold text-customgray">
              "plak"
            </span>
            <Link
              to="/albums"
              className="font-Magtis font-bold text-customgray hover:text-customorange transition-colors duration-500 mt-[0.25rem] pl-[0.8rem] block"
            >
              back to albums
            </Link>
          </div>
          <div className="bg-customborder rounded-lg w-[90%] max-w-[28.125rem] aspect-[9/13] relative">


            {/* Album Cover */}
            <div className="px-[2rem] relative h-[15rem] sm:h-[18.75rem] w-full max-w-[62.5rem] flex justify-center items-center mx-auto mt-[1rem]">
              <div className="relative w-full flex justify-center items-center">
                <div className="absolute transition-all duration-500 cursor-pointer z-30 translate-x-0 translate-y-0 scale-100 flex items-center">
                  <div className="relative z-20">
                    <img
                      src={album.src}
                      alt="Album"
                      className="w-[15rem] sm:w-[18.75rem] h-[15rem] sm:h-[18.75rem] rounded-sm transition-all duration-500 object-cover relative z-10 ring-1 ring-black/5"
                    />
                  </div>
                  <div className="relative z-10 -ml-[5rem] sm:-ml-[6.25rem]">
                    <div className="vinyl w-[10rem] sm:w-[12.5rem] h-[10rem] sm:h-[12.5rem] rounded-full overflow-hidden z-0 transition-all duration-1000 ease-in-out opacity-100 scale-100">
                      <div className="w-full h-full relative">
                        <img
                          src={album.src}
                          alt="vinyl cover"
                          className={`w-full h-full object-cover opacity-90
                      ${isPlaying ? "animate-spin-slow" : "rotate-0"}
                      `}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Album Cover End */}

            
            <div className="mt-[1.5rem] sm:mt-[2rem] px-[2rem]">
              <h2 className="text-[1.25rem] sm:text-[1.5rem] font-Lora text-customblack mb-[0.5rem] truncate">
                {album.albumName}
              </h2>
              <h3 className="text-[1rem] sm:text-[1.125rem] font-thin font-Lora text-customgray mb-[1rem] sm:mb-[1.5rem] truncate">
                {album.artist}
              </h3>
            </div>
            <div className="flex items-center justify-between mb-[0.5rem] sm:mb-[1rem] px-[2rem]">
              <span className="text-sm text-customgray">
                {formatTime(currentTime)}
              </span>
              <div
                className="w-full h-[0.2rem] sm:h-[.25rem] bg-customWhite rounded-full cursor-pointer relative"
                onClick={handleTimeBarClick}
              >
                <div
                  className="h-full bg-customgray opacity-50 rounded-full"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <span className="text-sm text-customgray">
                {formatTime(duration)}
              </span>
            </div>
            <div className="controls flex flex-col items-center justify-center gap-[1rem] sm:gap-[1.5rem] mt-[1rem] sm:mt-[1.5rem] px-[2rem]">
              <div className="flex items-center justify-center gap-[1rem] sm:gap-[1.5rem]">
                <button
                  onClick={handleRewind}
                  className="prev-button text-customblack"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="hover:fill-customorange w-[2rem] h-[2rem] stroke-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
                    />
                  </svg>
                </button>
                <button
                  onClick={handlePlayPause}
                  className="play-pause-button text-customblack"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-[2rem] h-[2rem] stroke-1 hover:fill-customorange transition-colors duration-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811Z"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleForward}
                  className="next-button text-customblack"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-[2rem] h-[2rem] stroke-1 hover:fill-customorange transition-colors duration-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
                    />
                  </svg>
                </button>
              </div>
              <VolumeSlider
                volume={volume}
                handleVolumeChange={handleVolumeChange}
              />
              <div className="flex items-center justify-between gap-[1rem]">
                <span className="text-customgray">Listen on:</span>
                <a href="">
                  <img
                    src={Spotify}
                    alt="Spotify Logo"
                    className="w-[1rem] sm:w-[1.5rem] h-[1rem] sm:h-[1.5rem]"
                  />
                </a>
                <a href="">
                  <img
                    src={Apple}
                    alt="Apple Music Logo"
                    className="w-[1rem] sm:w-[1.5rem] h-[1rem] sm:h-[1.5rem]"
                  />
                </a>
              </div>
            </div>
            <span className="absolute bottom-[0.3rem] sm:bottom-[0.5rem] left-[0.3rem] sm:left-[0.5rem] text-[0.4rem] sm:text-[0.5rem] text-customblack opacity-80">
              *Music powered by Spotify
            </span>
          </div>
          <audio ref={audioRef} src={album.sound} />
        </div>
      )}
      <Footer />
    </>
  );
};

export default Player;