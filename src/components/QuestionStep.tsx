import React from 'react';
import OptionButton from './OptionButton';
import { sampleFlowerData as flowerCardData } from "../data/flowerData";
import FlowerTypeOptionCard from './FlowerTypeOptionCard';
import FlowerSizeOptionCard from './FlowerSizeOptionCard';

interface QuestionStepProps {
  questionNumber: number;
  title: string;
  options: string[];
  selectedOptions: string[];
  onOptionSelect: (option: string) => void;
  onNext: () => void;
  onPrevious?: () => void;
  canProceed: boolean;
  isMultipleChoice?: boolean;
}

const QuestionStep: React.FC<QuestionStepProps> = ({
  questionNumber,
  title,
  options,
  selectedOptions,
  onOptionSelect,
  onNext,
  onPrevious,
  canProceed,
  isMultipleChoice = false
}) => {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center relative bg-[#FCFBF6] bg-cover bg-center text-center"
      style={{
        backgroundImage: "url('./src/assets/generate/bg.svg')",
      }}
    >

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-y-12">
        {/* 질문 번호 표시 */}
        <div className="flex justify-center">
          <div className="bg-white rounded-full border-[3px] border-[#FF9BAF] px-10 py-2 sm:px-12 sm:py-3">
            <span 
              className="text-[#FF9BAF] text-lg sm:text-xl"
              style={{
                fontFamily: 'BagelFatOne-Regular',
                fontWeight: '400',
                lineHeight: '1.45'
              }}
            >
              Question {questionNumber}
            </span>
          </div>
        </div>
        {/* 질문 제목 */}
        <div className="relative">
        <div className="bg-[#FFD1D4] rounded-full px-16 py-4 mb-4 inline-block">
          <h1 
            className="text-black text-center font-bold whitespace-nowrap text-xl sm:text-2xl md:text-3xl"
            style={{
              fontFamily: 'NEXON Lv1 Gothic OTF',
              fontWeight: '700',
              lineHeight: '1.39'
            }}
          >
            {title}
          </h1>
        </div>

        {/* 복수선택 문구 */}
        {isMultipleChoice && (
          <div className="absolute right-0 h-12 text-right text-sm text-[#999999] font-medium text-base"
            style={{
              fontFamily: 'NEXON Lv1 Gothic OTF',
              fontWeight: '400',
              lineHeight: '1.39'
            }}
          >
            복수 선택 가능
          </div>
        )}
        </div>
        {questionNumber === 4 ? (
          // 꽃 종류 카드 컴포넌트 렌더링
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {flowerCardData.map((card) => (
              <FlowerTypeOptionCard
                key={card.id}
                number={card.number}
                name={card.name}
                engName={card.engName}
                colorMeanings={card.colorMeanings}
                flowerImg={card.flowerImg}
                isSelected={selectedOptions.includes(card.id)}
                onClick={() => onOptionSelect(card.id)}
              />
            ))}
          </div>
        ) : questionNumber === 5 ? (
          <div className="flex flex-wrap justify-center gap-6">
            <FlowerSizeOptionCard
              number={1}
              size="S = One flower"
              description="한 송이의 마음"
              flowerImg="/src/assets/generate/image179.png"
              isSelected={selectedOptions.includes("S")}
              onClick={() => onOptionSelect("S")}
            />
            <FlowerSizeOptionCard
              number={2}
              size="M = Mini bouquets"
              description="조화로운 중간 크기"
              flowerImg="/src/assets/generate/image179.png"
              isSelected={selectedOptions.includes("M")}
              onClick={() => onOptionSelect("M")}
            />
            <FlowerSizeOptionCard
              number={3}
              size="L = Lush bouquet"
              description="풍성한 부케"
              flowerImg="/src/assets/generate/image179.png"
              isSelected={selectedOptions.includes("L")}
              onClick={() => onOptionSelect("L")}
            />
          </div>
        ) : (
          // 기본 옵션 버튼 렌더링
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 max-w-[480px] w-full">
          {options.map((option, index) => (
            <OptionButton
              key={index}
              option={option}
              isSelected={selectedOptions.includes(option)}
              onClick={() => onOptionSelect(option)}
            />
          ))}
        </div>
        )}
      </div>

      {/* 네비게이션 버튼들 */}
      <div className="absolute bottom-17 left-25 right-25 flex justify-between items-center">
        {/* 이전 버튼 (첫 번째 질문이 아닐 때만) */}
        {onPrevious && questionNumber > 1 && (
          <button
            type="button"
            onClick={onPrevious}
            className="w-[68px] h-[68px] relative rounded-full flex items-center justify-center transition-colors">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="85"
            height="85"
            viewBox="0 0 85 85"
            fill="none"
            className="absolute top-9/16 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
          >
            <g filter="url(#filter0_di)">
              <circle
                cx="42.1913"
                cy="38.1913"
                r="34.1913"
                fill="url(#paint0_linear)"
                shapeRendering="crispEdges"
              />
            </g>
            <defs>
              <filter id="filter0_di" x="0.3" y="0.3" width="83.7828" height="83.7828" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="3.85" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="3" dy="4" />
                <feGaussianBlur stdDeviation="0.8" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix"
                  values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.51 0"
                />
                <feBlend mode="normal" in2="shape" result="effect2_innerShadow" />
              </filter>
              <linearGradient id="paint0_linear" x1="25.7054" y1="12.546" x2="45.2746" y2="45.002" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" stopOpacity="0.1" />
                <stop offset="1" stopColor="white" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>
            {/* 왼쪽 화살표 아이콘 */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-6 h-6 z-20"
            >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25" />
          </svg>
          </button>
        )}

        <div className="flex-1"></div>

        {/* 다음 버튼 */}
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className="w-[68px] h-[68px] relative rounded-full flex items-center justify-center transition-colors">
          {canProceed && (
            <div className="absolute inset-0 rounded-full bg-[#FF9BAF] z-0 transition-colors" />
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="85"
            height="85"
            viewBox="0 0 85 85"
            fill="none"
            className="absolute top-9/16 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
          >
            <g filter="url(#filter0_di)">
              <circle
                cx="42.1913"
                cy="38.1913"
                r="34.1913"
                fill="url(#paint0_linear)"
                shapeRendering="crispEdges"
              />
            </g>
            <defs>
              <filter id="filter0_di" x="0.3" y="0.3" width="83.7828" height="83.7828" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="3.85" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="3" dy="4" />
                <feGaussianBlur stdDeviation="0.8" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix"
                  values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.51 0"
                />
                <feBlend mode="normal" in2="shape" result="effect2_innerShadow" />
              </filter>
              <linearGradient id="paint0_linear" x1="25.7054" y1="12.546" x2="45.2746" y2="45.002" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" stopOpacity="0.1" />
                <stop offset="1" stopColor="white" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>
          {/* 오른쪽 화살표 아이콘 */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-6 h-6 z-20"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default QuestionStep;
