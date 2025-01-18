import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router";
import LoadingVinyl from "../components/LoadingVinyl";
import images from "../data/images";
import Spotify from "../../public/pics/Spotify-Logo.png";
import Apple from "../../public/pics/apple-logo.png";
import VolumeSlider from "../components/VolumeSlider";
import ButtonWithStyles from "../components/Button";
import { TbArrowBack } from "react-icons/tb";
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
      const rect = e.target.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const newTime = (offsetX / rect.width) * audio.duration;
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
          <div className="flex flex-col absolute top-4 left-4 z-50 pl-2 pt-2">
            <span className="font-Magtis text-5xl font-extrabold text-customgray">
              "plak"
            </span>
            <Link
              to="/albums"
              className="font-Magtis font-bold text-customgray hover:text-customorange transition-colors duration-500 mt-2 pl-5"
            >
              back to albums
            </Link>
          </div>
          <div className="bg-customborder rounded-lg pt-4 w-[450px] h-[660px] relative">
            {/* Album Cover */}

            <div className="px-8 relative h-[300px] w-full max-w-[1000px] flex justify-center items-center mx-auto mt-4">
              <div className="relative w-full flex justify-center items-center">
                <div className="absolute transition-all duration-500 cursor-pointer z-30 translate-x-0 translate-y-0 scale-100 flex items-center">
                  <div className="relative z-20">
                    <img
                      src={album.src}
                      alt="Album"
                      className="w-[300px] h-[300px] rounded-sm transition-all duration-500 object-cover relative z-10 ring-1 ring-black/5"
                    />
                  </div>
                  <div className="relative z-10 -ml-[100px]">
                    <div className="vinyl w-[200px] h-[200px] rounded-full overflow-hidden z-0 transition-all duration-1000 ease-in-out opacity-100 scale-100">
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

            <div className="mt-8 px-8">
              <h2 className="text-2xl font-Lora text-customblack mb-2 truncate">
                {album.albumName}
              </h2>
              <h3 className="text-lg font-thin font-Lora text-customgray mb-6 truncate">
                {album.artist}
              </h3>
            </div>
            <div className="flex items-center justify-between mb-4 px-8">
              <span className="text-sm text-customgray">
                {formatTime(currentTime)}
              </span>
              <div
                className="w-full mx-4 bg-zinc-200 rounded-full h-1 cursor-pointer"
                onClick={handleTimeBarClick}
              >
                <div
                  className="bg-customblack h-1 rounded-full transition-all duration-200"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <span className="text-sm text-customgray">
                {formatTime(duration)}
              </span>
            </div>
            <div className="controls flex flex-col items-center justify-center gap-4 mt-4 px-8">
              <div className="flex items-center justify-center gap-4">
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
                    className="hover:fill-customorange w-8 h-8 stroke-1"
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
                    className="w-8 h-8 stroke-1 hover:fill-customorange transition-colors duration-500"
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
                    className="w-8 h-8 stroke-1 hover:fill-customorange transition-colors duration-500"
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
              <div className="flex items-center justify-between gap-4">
                <span className="text-customgray">Listen on:</span>
                <a href="">
                  <img src={Spotify} alt="Spotify Logo" className="w-6 h-6" />
                </a>
                <a href="">
                  <img src={Apple} alt="Apple Music Logo" className="w-6 h-6" />
                </a>
              </div>
            </div>
            <span className="absolute bottom-2 left-2 text-[8px] text-customblack opacity-80">
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
