import React from "react";

export default function Player() {

  return (
    <div className="relative">
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[200px] h-[200px] rounded-full overflow-hidden z-0 transition-all duration-1000 ease-in-out opacity-100 scale-100 -translate-y-[45%]"
      >
        <div className="w-full h-full relative animate-spin-slow">
          <img src="../../public/pics/album4.jpg" alt="spin" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full bg-zinc-900">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-zinc-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
