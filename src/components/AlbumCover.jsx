import cover from "../../public/pics/album1.jpg";

const AlbumCover = () => {
  return (
      <div className="relative h-[300px] w-full max-w-[1000px] flex justify-center items-center mx-auto mt-4">
        <div className="relative w-full flex justify-center items-center">
          <div className="absolute transition-all duration-500 cursor-pointer z-30 translate-x-0 translate-y-0 scale-100 flex items-center">
            <div className="relative z-20">
              <img
                src={cover}
                alt="Album"
                className="w-[300px] h-[300px] rounded-sm transition-all duration-500 object-cover relative z-10 ring-1 ring-black/5"
              />
            </div>
            <div className="relative z-10 -ml-[100px]">
              <div className="vinyl w-[200px] h-[200px] rounded-full overflow-hidden z-0 transition-all duration-1000 ease-in-out opacity-100 scale-100">
                <div className="w-full h-full relative">
                  <img
                    src={cover}
                    alt="vinyl cover"
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default AlbumCover;
