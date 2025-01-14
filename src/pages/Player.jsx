import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router";
import { IoReturnDownBackOutline } from "react-icons/io5";
import LoadingVinyl from "../components/LoadingVinyl";
import images from "../data/images";
import Spotify from "../../public/pics/Spotify-Logo.png";
import Apple from "../../public/pics/apple-logo.png";
import AlbumCover from "../components/AlbumCover";
import VolumeSlider from "../components/VolumeSlider";

const Player = () => {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180);
  const [volume, setVolume] = useState(50);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef(null);

  const album = images[id];

  /* useEffect(() => {
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
  }, [isPlaying, duration]); */

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

  // const togglePlay = () => setIsPlaying(!isPlaying);

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
          <Link
            to="/albums"
            className="absolute top-8 left-8 text-customblack hover:text-customgray transition-colors"
          >
            <span>Back to Albums</span>
            <IoReturnDownBackOutline className="w-6 h-6 absolute bottom-0 right-0" />
          </Link>
          <div className="bg-[#FAF9F6] rounded-lg shadow-lg px-8 pb-8 pt-4 w-[450px] h-[640px]">
            <AlbumCover />
            <div className="mt-8">
              <h2 className="text-2xl font-Lora text-customblack mb-2 truncate">
                {album.albumName}
              </h2>
              <h3 className="text-lg font-thin font-Lora text-customgray mb-6 truncate">
                {album.artist}
              </h3>
            </div>
            <div className="flex items-center justify-between mb-4">
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
            <div className="controls flex flex-col items-center justify-center gap-4 mt-4">
              <div className="flex items-center justify-center gap-4">
                <button onClick={handleRewind} className="prev-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 stroke-1 hover:fill-customorange"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
                    />
                  </svg>
                </button>
                <button onClick={handlePlayPause} className="play-pause-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 stroke-1 hover:fill-customorange"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811Z"
                    />
                  </svg>
                </button>
                <button onClick={handleForward} className="next-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 stroke-1 hover:fill-customorange duration-500 transition-colors"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
                    />
                  </svg>
                </button>
              </div>
              <VolumeSlider volume={volume} handleVolumeChange={handleVolumeChange} />
              <div className="flex items-center justify-between gap-4">
                <span>Listen on:</span>
                <img src={Spotify} alt="Spotify Logo" className="w-6 h-6" />
                <img src={Apple} alt="Apple Music Logo" className="w-6 h-6" />
              </div>
            </div>
            <span className="ml-2">Music powered by Spotify</span>
          </div>
          <audio ref={audioRef} src={album.sound} />
        </div>
      )}
    </>
  );
};

export default Player;
