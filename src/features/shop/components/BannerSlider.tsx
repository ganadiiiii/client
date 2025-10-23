// src/components/shop/BannerSlider.tsx
import { useEffect, useRef, useState } from "react";
import iconLeft from "../../../assets/shop/icon-left.svg";
import iconRight from "../../../assets/shop/icon-right.svg";
import banner1 from '../../../assets/shop/banner-1.png';
import banner2 from '../../../assets/shop/banner-2.png';
import banner3 from '../../../assets/shop/banner-3.png';
import banner4 from '../../../assets/shop/banner-4.png';

const images = [
  banner1,
  banner2,
  banner3,
  banner4,
];

const BannerSlider = () => {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 4000);
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] 3xl:h-[481px] 4xl:h-[605px] overflow-hidden">
      {/* 이미지 슬라이드 */}
      <div className="flex transition-transform duration-700 ease-in-out bg-gray-100" style={{ transform: `translateX(-${index * 100}%)` }}>
        {images.map((src, i) => (
          <img key={i} src={src} alt={`banner-${i}`} className="w-full flex-shrink-0 object-cover h-[400px] 3xl:h-[481px] 4xl:h-[605px]" />
        ))}
      </div>

      {/* 좌우 버튼 */}
      <button onClick={prev} className="absolute top-1/2 left-1/10 transform -translate-y-1/2">
        <img src={iconLeft} alt="icon-left" className="w-4 h-8" />
      </button>
      <button onClick={next} className="absolute top-1/2 right-1/10 transform -translate-y-1/2">
        <img src={iconRight} alt="icon-right" className="w-4 h-8" />
      </button>

      {/* 하단 점 */}
      <div className="absolute bottom-[50px] left-1/2 transform -translate-x-1/2 flex gap-4">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${i === index ? "bg-primary" : "bg-gray/60"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;