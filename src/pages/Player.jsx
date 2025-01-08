import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import {
  IoReturnDownBackOutline,
  IoPlayBackOutline,
  IoPlayOutline,
  IoPlayForwardOutline,
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
  const [volume, setVolume] = useState(50);

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

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  return (
    <div className="flex items-center justify-center bg-customWhite py-10 relative">
      <img
        src={album.src}
        alt="Album Cover"
        className="w-[300px] h-[300px] rounded-sm transition-all duration-500 object-cover relative z-0 ring-1 ring-black/5"
      />
      <div
        className="vinyl absolute flex items-center justify-center w-[200px] h-[200px] rounded-full overflow-hidden z-10 transition-all duration-1000 ease-in-out opacity-100 scale-100"
      >
        <div className="w-full h-full animate-spin-slow relative">
          <img
            src={album.src}
            alt="Vinyl Record"
            className="w-full h-full object-cover opacity-100"
          />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full bg-zinc-900">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-zinc-700" />
          </div>
        </div>
      </div>
    </div>

    //NEW DESIGN
    // <div className="flex items-center justify-center bg-customWhite py-10">
    //   <div
    //   className="vinyl flex items-center justify-center w-[200px] h-[200px] rounded-full overflow-hidden z-0 transition-all duration-1000 ease-in-out opacity-100 scale-100 translate-x-[45%]">
    //     <div className="w-full h-full animate-spin-slow">
    //       <img
    //         src={album.src}
    //         alt="something"
    //         className="w-full h-full object-cover opacity-90"
    //       />
    //       <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full bg-zinc-900">
    //         <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-zinc-700" />
    //       </div>
    //     </div>
    //   </div>
    //   <img
    //     src={album.src}
    //     alt="something"
    //     className="w-[300px] h-[300px] rounded-sm transition-all duration-500 object-cover relative z-10 ring-1 ring-black/5"
    //   />
    // </div>

    //OLD DESIGN
    // <div className="min-h-screen flex flex-col items-center justify-center bg-customWhite p-8">
    //   <Link
    //     to="/albums"
    //     className="absolute top-8 left-8 text-customblack hover:text-customgray transition-colors"
    //   >
    //     <span>Back to Albums</span>
    //     <IoReturnDownBackOutline className="w-6 h-6 absolute bottom-0 right-0" />
    //   </Link>
    //   <div className="bg-[#FAF9F6] rounded-lg shadow-lg px-8 pb-8 pt-4">
    //     <div className="flex flex-row w-full max-w-md">
    //       <input
    //         type="range"
    //         min="0"
    //         max="100"
    //         value={volume}
    //         onChange={handleVolumeChange}
    //         className="mt-4 accent-customorange transform -rotate-90 basis-1/4"
    //       />
    //       <div className="relative mb-8 basis-3/4">
    //         <div className="aspect-square relative">
    //           <div className="absolute inset-0 flex items-center justify-center">
    //             <div
    //               className={`w-[95%] h-[95%] rounded-full bg-customgray shadow-lg transition-transform duration-1000
    //               ${isPlaying ? "animate-spin-slow" : "rotate-0"}`}
    //             >
    //               <div className="absolute inset-0 rounded-full overflow-hidden opacity-100">
    //                 <img
    //                   src={album.src}
    //                   alt="Vinyl texture"
    //                   className="w-full h-full object cover"
    //                 />
    //               </div>
    //               <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[15%] h-[15%] rounded-full bg-customblack">
    //                 <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[20%] h-[20%] rounded-full bg-customgray" />
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <h2 className="text-2xl font-Lora text-customblack mb-2">
    //       {album.albumName}
    //     </h2>
    //     <h3 className="text-lg font-thin font-Lora text-customgray mb-6">
    //       {album.artist}
    //     </h3>
    //     <div className="flex items-center justify-between mb-4">
    //       <span className="text-sm text-customgray">
    //         {formatTime(currentTime)}
    //       </span>
    //       <div className="w-full mx-4 bg-zinc-200 rounded-full h-1">
    //         <div
    //           className="bg-customblack h-1 rounded-full transition-all duration-200"
    //           style={{ width: `${(currentTime / duration) * 100}%` }}
    //         />
    //       </div>
    //       <span className="text-sm text-customgray">
    //         {formatTime(duration)}
    //       </span>
    //     </div>
    //     <div className="controls flex flex-col items-center justify-center gap-4 mt-4">
    //       <div className="flex items-center justify-center gap-4">
    //         <button
    //           onClick={() => console.log("Previous")}
    //           className="prev-button"
    //         >
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             strokeWidth={1.5}
    //             stroke="currentColor"
    //             className="w-8 h-8 stroke-1 hover:fill-customorange"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
    //             />
    //           </svg>
    //         </button>
    //         <button onClick={handlePlayPause} className="play-pause-button">
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             strokeWidth={1.5}
    //             stroke="currentColor"
    //             className="w-8 h-8 stroke-1 hover:fill-customorange"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811Z"
    //             />
    //           </svg>
    //         </button>
    //         <button onClick={() => console.log("Next")} className="next-button">
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             strokeWidth={1.5}
    //             stroke="currentColor"
    //             className="w-8 h-8 stroke-1 hover:fill-customorange duration-500 transition-colors"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
    //             />
    //           </svg>
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Player;
