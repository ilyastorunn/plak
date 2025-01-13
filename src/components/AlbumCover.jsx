import cover from "../../public/pics/album1.jpg";

const AlbumCover = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-[#f7f4f2]">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-80">
        {/* Albüm Kapağı */}
        <div className="relative w-full h-48 overflow-hidden rounded-lg">
          <img
            src={cover}
            alt="Album Cover"
            className="w-full h-full object-cover"
          />

          <div
            className="absolute top-0 right-0 w-28 h-28 bg-white rounded-full -translate-x-1/3 -translate-y-1/3"
            style={{ clipPath: "ellipse(70% 50% at 50% 50%)" }}
          >
            <img
              src={cover}
              alt="Record Effect"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-xl font-semibold text-gray-800">I Can't Explain</h2>
          <p className="text-sm text-gray-500">Cappucino</p>
        </div>
      </div>
    </div>
    )
}

export default AlbumCover;