import { useEffect, useState, useCallback } from "react";

interface SlideContent {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  image: string;
}

const heroContent: SlideContent[] = [
  {
    id: 1,
    title: "Membangun Masa Depan Pertanian",
    subtitle: "Inovasi Berkelanjutan untuk Indonesia",
    category: "Visi",
    image: "/index/index1.jpg",
  },
  {
    id: 2,
    title: "Dari Alam, Untuk Kehidupan",
    subtitle: "Melestarikan Tradisi, Merangkul Teknologi",
    category: "Misi",
    image: "/index/index2.jpg",
  },
  {
    id: 3,
    title: "Bersama Menuju Kemandirian",
    subtitle: "Pertanian Modern yang Ramah Lingkungan",
    category: "Tujuan",
    image: "/index/index3.jpg",
  },
];

interface IndicatorProps {
  isActive: boolean;
  onClick: () => void;
}

const Indicator: React.FC<IndicatorProps> = ({ isActive, onClick }) => (
  <button
    className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
      isActive ? "bg-white scale-125" : "bg-gray-400"
    }`}
    onClick={onClick}
  />
);

export default function IndexHero() {
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPostIndex((prevIndex) => (prevIndex + 1) % heroContent.length);
      setIsAnimating(false);
    }, 500);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleIndicatorClick = (index: number) => {
    if (index === currentPostIndex || isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPostIndex(index);
      setIsAnimating(false);
    }, 500);
  };

  const getPreviousIndex = () =>
    (currentPostIndex - 1 + heroContent.length) % heroContent.length;

  const getNextIndex = () => (currentPostIndex + 1) % heroContent.length;

  return (
    <div className="relative h-[calc(100vh-4rem)] md:h-screen w-full mx-auto overflow-hidden">
      <div className="absolute inset-0">
        {[getPreviousIndex(), currentPostIndex, getNextIndex()].map(
          (index, i) => (
            <img
              key={`slide-${index}`}
              src={heroContent[index].image}
              className={`absolute inset-0 object-cover w-full h-full transition-transform duration-500 ease-in-out ${
                i === 0
                  ? isAnimating
                    ? "translate-x-full"
                    : "-translate-x-full"
                  : i === 1
                  ? isAnimating
                    ? "translate-x-full"
                    : "translate-x-0"
                  : isAnimating
                  ? "translate-x-0"
                  : "translate-x-full"
              }`}
              style={{
                objectPosition: "center center",
                filter: "brightness(40%)",
              }}
              alt={heroContent[index].title}
            />
          )
        )}

        <div className="h-full w-full absolute inset-0 bg-gradient-to-t from-amber-400 via-transparent to-transparent opacity-30" />

        <div
          className={`absolute inset-0 flex flex-col justify-center items-center transition-opacity duration-500 ${
            isAnimating ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="text-white text-center px-4 md:px-8 max-w-4xl mx-auto">
            <div>
              <h3 className="inline-block font-semibold mb-4 backdrop-blur-sm bg-white/10 text-gray-100 px-5 py-2 rounded-full shadow-2xl hover:bg-white/20 transition-all duration-300">
                {heroContent[currentPostIndex].category}
              </h3>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              {heroContent[currentPostIndex].title}
            </h1>

            <h2 className="text-gray-300 text-xl md:text-2xl mb-8">
              {heroContent[currentPostIndex].subtitle}
            </h2>

            <div className="flex justify-center gap-2">
              {heroContent.map((_, index) => (
                <Indicator
                  key={index}
                  isActive={index === currentPostIndex}
                  onClick={() => handleIndicatorClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
