import React from 'react';
import { motion } from 'framer-motion';

// 옷 아이템 컴포넌트
const ClothingItem = ({ children, rotateDirection = 'right' }: { children: React.ReactNode, rotateDirection: 'right' | 'left' }) => {
  // 회전 방향에 따라 초기 회전 각도 설정
  const rotateValue = rotateDirection === 'right' ? 8 : -8;

  return (
    <motion.div
      className="w-28 h-36 bg-white rounded-lg shadow-xl cursor-pointer flex items-center justify-center font-bold text-slate-700 select-none"
      // 마우스를 올렸을 때의 상태
      whileHover={{
        rotate: rotateValue,
        scale: 1.05,
        y: -15,
      }}
      // 애니메이션 물리 효과 설정
      transition={{
        type: "spring",
        stiffness: 300, // 스프링의 탄성. 높을수록 더 빠르고 강하게 반응.
        damping: 10,    // 감쇠력. 흔들림을 멈추게 하는 힘. 낮을수록 더 오래 흔들림.
      }}
      // 회전 기준점 (매우 중요!)
      style={{
        transformOrigin: "top center"
      }}
    >
      {children}
    </motion.div>
  );
};

// 메인 빨랫줄 컴포넌트
const Clothesline = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-b from-sky-200 to-sky-300 overflow-hidden">
      <h1 className="text-3xl font-extrabold mb-4 text-white text-shadow">자연스럽게 흔들리는 빨랫줄</h1>
      <p className="mb-16 text-sky-100 text-shadow">마우스를 옷 위로 가져가 보세요</p>
      
      {/* 빨랫줄과 기둥 */}
      <div className="relative w-4/5 lg:w-1/2 flex justify-center">
        {/* 기둥 */}
        <div className="absolute bottom-0 left-[-20px] w-5 h-48 bg-yellow-800 border-2 border-yellow-900 shadow-lg"></div>
        <div className="absolute bottom-0 right-[-20px] w-5 h-48 bg-yellow-800 border-2 border-yellow-900 shadow-lg"></div>

        {/* 빨랫줄 */}
        <div className="w-full h-1.5 bg-gray-300 rounded-full shadow-inner flex justify-around items-center">
          {/* 옷 아이템들 */}
          <ClothingItem rotateDirection="right">T-Shirt</ClothingItem>
          <ClothingItem rotateDirection="left">Socks</ClothingItem>
          <ClothingItem rotateDirection="right">Towel</ClothingItem>
        </div>
      </div>
    </div>
  );
};

// 텍스트 그림자 유틸리티 클래스 (tailwind.config.js에 추가하거나, global.css에 추가)
// 이 예제에서는 간단히 style 태그로 추가하여 바로 확인 가능하도록 하겠습니다.
const StyleInjector = () => (
  <style>{`
    .text-shadow {
      text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
    }
  `}</style>
);


const App = () => {
    return (
        <>
            <StyleInjector />
            <Clothesline />
        </>
    )
}

export default App;