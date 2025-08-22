import React from "react";
import { sampleFlowerData as flowerCardData } from "../data/flowerData";
import FlowerSizeOptionCard from "./FlowerSizeOptionCard";
import FlowerTypeOptionCard from "./FlowerTypeOptionCard";
import OptionButton from "./OptionButton";
import NavigationButton from "./NavigationButton";

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

const HIGHLIGHT_MAP: Record<number, string> = {
	1: "선물하시나요?",
	2: "함께 나누고 싶으신가요?",
	3: "어떤 감정을 담고 싶으신가요?",
	4: "특별히 담고 싶은 꽃",
	5: "꽃다발의 크기",
};

function renderHighlighted(title: string, phrase?: string) {
	if (!phrase || !title.includes(phrase)) return title;

	const [before, after] = title.split(phrase);
	return (
		<>
			{before}
			<span
				className="inline-flex items-center bg-[#FFD1D4] rounded-full px-4 h-16"
				style={{
					boxDecorationBreak: "clone",
					WebkitBoxDecorationBreak: "clone",
				}}
			>
				{phrase}
			</span>
			{after}
		</>
	);
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
	isMultipleChoice = false,
}) => {
	return (
		<div
			className="min-h-screen flex flex-col items-center justify-center relative bg-[#FCFBF6] bg-cover bg-center text-center"
			style={{
				backgroundImage: "url('./src/assets/generate/bg.svg')",
			}}
		>
			{/* 메인 콘텐츠 */}
			<div className="flex-1 flex flex-col items-center justify-center px-8 gap-y-10">
				{/* 질문 번호 표시 */}
				<div className="flex justify-center">
					<div className="bg-white rounded-full border-[3px] border-[#FF9BAF] px-10 py-2 sm:px-12 sm:py-3">
						<span
							className="text-[#FF9BAF] text-lg sm:text-xl"
							style={{
								fontFamily: "BagelFatOne-Regular",
								fontWeight: "400",
								lineHeight: "1.45",
							}}
						>
							Question {questionNumber}
						</span>
					</div>
				</div>
				{/* 질문 제목 */}
				<div className="relative">
					{/* <div className="bg-[#FFD1D4] rounded-full px-16 py-4 mb-4 inline-block"> */}
					<h1
						className="text-black text-center font-bold whitespace-nowrap text-xl sm:text-2xl md:text-3xl mb-4"
						style={{
							fontFamily: "NEXON Lv1 Gothic OTF",
							fontWeight: "700",
							lineHeight: "1.39",
						}}
					>
						{renderHighlighted(title, HIGHLIGHT_MAP[questionNumber])}
					</h1>

					{/* 복수선택 문구 */}
					{isMultipleChoice && (
						<div
							className="absolute right-0 h-12 text-right text-[#999999] font-medium text-base"
							style={{
								fontFamily: "NEXON Lv1 Gothic OTF",
								fontWeight: "400",
								lineHeight: "1.39",
							}}
						>
							복수 선택 가능
						</div>
					)}
				</div>
				{questionNumber === 4 ? (
					// 꽃 종류 카드 컴포넌트 렌더링
					<div className="flex flex-wrap gap-4 justify-center max-w-[1089px]">
						{flowerCardData.map((card) => (
							<div key={card.id} className="w-[205px]">
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
							</div>
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
					<NavigationButton
						direction="left"
						onClick={onPrevious}
					/>
				)}

				<div className="flex-1"></div>

				{/* 다음 버튼 */}
				<NavigationButton
					direction="right"
					onClick={onNext}
					disabled={!canProceed}
				/>
			</div>
		</div>
	);
};

export default QuestionStep;
