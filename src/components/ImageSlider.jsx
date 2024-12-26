import { useState, useEffect } from 'react'

const images = [
  { src: '../../public/pics/album1.jpg', artist: 'The Chocolate Jam Co', albumName: 'The Speed of Earth' },
  { src: '../../public/pics/album2.jpg', artist: 'Mieko Hirota', albumName: 'A Woman Am I' },
  { src: '../../public/pics/album3.jpg', artist: 'Cappuccino', albumName: 'I Can\'t Explain' },
  { src: '../../public/pics/album4.jpg', artist: 'Sai Hsai Mao', albumName: 'Build A Hospital For Broken Hearts' },
  { src: '../../public/pics/album5.jpg', artist: 'Ernest Ranglin', albumName: 'Surfin' },
  { src: '../../public/pics/album6.jpg', artist: 'Valerie Cizmarova', albumName: 'Padal Dest' },
  { src: '../../public/pics/album7.jpg', artist: 'Hiromasa Suzuki', albumName: 'High Flying' },
  { src: '../../public/pics/album8.jpg', artist: 'Ансамбль Иверия', albumName: 'Тема Аэта' },
  { src: '../../public/pics/album9.jpg', artist: 'Kimiko Kasai', albumName: 'Unfinished Life' },
]

const ImageSlider = () => {
    const [selectedIndex, setSelectedIndex] = useState(3)
    const [vinylVisible, setVinylVisible] = useState(true)
  
    const moveToSelected = (direction) => {
      setVinylVisible(false)
      setTimeout(() => {
        if (direction === 'next') {
          setSelectedIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
          )
        } else if (direction === 'prev') {
          setSelectedIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
          )
        }
        setTimeout(() => setVinylVisible(true), 100) 
      }, 500) 
    }
  
    useEffect(() => {
      setVinylVisible(true)
    }, [])
  
    const getClassName = (index) => {
      const total = images.length
      const difference = (index - selectedIndex + total) % total
  
      if (difference === 0) return 'selected'
      if (difference === 1) return 'next'
      if (difference === 2) return 'nextRightSecond'
      if (difference === total - 1) return 'prev'
      if (difference === total - 2) return 'prevLeftSecond'
      return difference < total / 2 ? 'hideRight' : 'hideLeft'
    }
  
    const getStyles = (className) => {
      switch (className) {
        case 'selected':
          return 'z-30 translate-x-0 translate-y-0 scale-100'
        case 'next':
          return 'z-20 translate-x-[180px] translate-y-[-20px] scale-[0.85]'
        case 'nextRightSecond':
          return 'z-10 translate-x-[320px] translate-y-[-40px] scale-[0.7]'
        case 'prev':
          return 'z-20 translate-x-[-180px] translate-y-[-20px] scale-[0.85]'
        case 'prevLeftSecond':
          return 'z-10 translate-x-[-320px] translate-y-[-40px] scale-[0.7]'
        default:
          return 'opacity-0 translate-x-0 scale-0'
      }
    }
  
    return (
      <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-white p-8">
        <div className="relative h-[500px] w-full max-w-7xl flex justify-center items-center mx-auto">
          <div className="relative w-full flex justify-center items-center">
            {images.map((img, index) => {
              const className = getClassName(index)
              const isSelected = className === 'selected'
              return (
                <div
                  key={index}
                  className={`absolute transition-all duration-500 cursor-pointer ${getStyles(className)}`}
                  onClick={() => setSelectedIndex(index)}
                >
                  <div className="relative">
                    {isSelected && (
                      <div 
                        className={`vinyl absolute left-1/2 -translate-x-1/2 top-0 w-[300px] h-[300px] rounded-full overflow-hidden z-0 transition-all duration-1000 ease-in-out
                          ${vinylVisible ? 'opacity-100 scale-100 -translate-y-1/2' : 'opacity-0 scale-80 translate-y-0'}`}
                      >
                        <div className="w-full h-full relative animate-spin-slow">
                          <img
                            src={img.src}
                            alt={`Vinyl for ${img.albumName}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] rounded-full bg-black">
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[15px] h-[15px] rounded-full bg-gray-600" />
                          </div>
                        </div>
                      </div>
                    )}
                    <img
                      src={img.src}
                      alt={`Album cover for ${img.albumName}`}
                      className="w-[300px] h-[300px] rounded-lg shadow-lg transition-all duration-500 object-cover relative z-10"
                    />
                  </div>
                  {isSelected && (
                    <div className="absolute -bottom-16 left-0 w-full text-center">
                      <p className="text-lg font-semibold mb-1 text-gray-800">{img.artist}</p>
                      <p className="text-base text-gray-600">{img.albumName}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
        <div className="absolute w-full top-1/2 -translate-y-1/2 flex justify-between px-5 box-border pointer-events-none z-40 max-w-7xl">
          <button
            className="text-gray-800 hover:text-gray-600 text-4xl border-none bg-transparent transition-all duration-300 hover:scale-125 pointer-events-auto"
            onClick={() => moveToSelected('prev')}
            aria-label="Previous image"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="50" 
              height="50" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            className="text-gray-800 hover:text-gray-600 text-4xl border-none bg-transparent transition-all duration-300 hover:scale-125 pointer-events-auto"
            onClick={() => moveToSelected('next')}
            aria-label="Next image"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="50" 
              height="50" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    )
  }
  
  export default ImageSlider
  
  