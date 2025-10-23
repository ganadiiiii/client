import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { sampleFlowerData as flowerCardData } from "../../../data/flowerData";
import FlowerSizeOptionCard from "../components/FlowerSizeOptionCard";
import FlowerTypeOptionCard from "../components/FlowerTypeOptionCard";
import DecorationOptionCard from "./DecorationOptionCard";
import NavigationButton from "./NavigationButton";
import OptionButton from "./OptionButton";
import PaperOptionCard from "./PaperOptionCard";
import ColorOptionCard from "./ColorOptionCard";
import DecoOptionCard from "./DecoOptionCard";

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
	1: "누구에게",
	2: "어떤 순간을",
	3: "어떤 감정을 담고 싶으신가요?",
	4: "특별히 담고 싶은 꽃",
	5: "꽃다발의 크기",
	6: "꽃다발의 포장지",
	7: "꽃다발의 색깔",
	8: "포인트 장식",
	9: "세부 장식",
};

function renderHighlighted(title: string, phrase?: string) {
	if (!phrase || !title.includes(phrase)) return title;

	const [before, after] = title.split(phrase);
	return (
		<>
			{before}
			<span
				className="inline-flex items-center bg-primary/40 rounded-3xl px-3 pb-1 pt-2"
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
	// Track navigation direction: 1 for next, -1 for previous
	const [direction, setDirection] = useState<number>(1);
	const [hasMounted, setHasMounted] = useState(false);
	useEffect(() => setHasMounted(true), []);

	// Q9 (Deco) local state to avoid parent overwriting between point/color
	const [decoPoint, setDecoPoint] = useState<string>("ribbon");
	const [decoColor, setDecoColor] = useState<string>("white");

	useEffect(() => {
		if (questionNumber === 9) {
			const initialPoint = selectedOptions.find((v) => v.startsWith("point:"))?.split(":")[1] ?? "ribbon";
			const initialColor = selectedOptions.find((v) => v.startsWith("color:"))?.split(":")[1] ?? "white";
			setDecoPoint(initialPoint);
			setDecoColor(initialColor);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [questionNumber]);

	// Slide variants based on direction
	const slideVariants = {
		enter: (dir: number) => ({ x: dir * 200, opacity: 0 }),
		center: { x: 0, opacity: 1 },
		exit: (dir: number) => ({ x: -dir * 200, opacity: 0 }),
	};

	const handleNext = () => {
		// For Q9, persist both point and color to parent before moving next
		if (questionNumber === 9) {
			onOptionSelect(`point:${decoPoint}`);
			onOptionSelect(`color:${decoColor}`);
		}
		setDirection(1);
		onNext();
	};

	const handlePrevious = () => {
		setDirection(-1);
		onPrevious?.();
	};
	return (
		<div
			className="min-h-screen flex flex-col items-center justify-center relative bg-background bg-cover bg-center text-center"
			style={{
				backgroundImage: "url('./src/assets/generate/bg.svg')",
			}}
		>
			{/* question content with slide transition */}
			<div className="flex-1 flex flex-col items-center justify-center gap-y-4 md:gap-y-6 2xl:gap-y-10 w-full overflow-hidden">
				<AnimatePresence mode="wait" initial={false} custom={direction}>
					<motion.div
						key={questionNumber}
						custom={direction}
						variants={slideVariants}
						initial={hasMounted ? "enter" : false}
						animate="center"
						exit="exit"
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 20,
							mass: 0.5,
						}}
						className="flex flex-col items-center justify-center gap-y-10"
					>
						{/* question number */}
						<div className="flex justify-center">
							<div className="bg-transparent rounded-full border-[3px] border-primary/40 px-14 py-2">
								<span
									className="text-primary/40 text-xl"
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
						{/* question title */}
						<div className="relative">
							{/* <div className="bg-[#FFD1D4] rounded-full px-16 py-4 mb-4 inline-block"> */}
							<h1
								className="text-black text-center mb-2 font-bold whitespace-nowrap text-3xl"
								style={{
									fontFamily: "NexonLv1Gothic",
									fontWeight: "700",
									lineHeight: "1.39",
								}}
							>
								{renderHighlighted(title, HIGHLIGHT_MAP[questionNumber])}
							</h1>
							{/* 복수선택 문구 */}
							{isMultipleChoice && (
								<p
									className="absolute right-0 text-right text-gray font-medium text-medium"
									style={{
										fontFamily: "NexonLv1Gothic",
										fontWeight: "400",
										lineHeight: "1.39",
									}}
								>
									복수 선택 가능
								</p>
							)}
						</div>
						{questionNumber === 4 ? (
							// 꽃 종류 카드 컴포넌트 렌더링
							<div className="flex flex-wrap gap-4 justify-center max-w-[900px] 3xl:max-w-[1100px] 4xl:max-w-[1440px]">
								{flowerCardData.map((card) => (
									<div key={card.id} style={{ width: "12.8em" }}>
										<FlowerTypeOptionCard
											key={card.id}
											number={card.number}
											name={card.name}
											engName={card.engName}
											colorMeanings={card.colorMeanings}
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
									isSelected={selectedOptions.includes("S")}
									onClick={() => onOptionSelect("S")}
								/>
								<FlowerSizeOptionCard
									number={2}
									size="M = Mini bouquets"
									description="적당한 크기"
									isSelected={selectedOptions.includes("M")}
									onClick={() => onOptionSelect("M")}
								/>
								<FlowerSizeOptionCard
									number={3}
									size="L = Lush bouquet"
									description="풍성한 부케"
									isSelected={selectedOptions.includes("L")}
									onClick={() => onOptionSelect("L")}
								/>
							</div>
						) : questionNumber === 6 ? (
							<div className="flex flex-wrap justify-center gap-6">
								<PaperOptionCard
									number={1}
									paper="Kraft paper"
									description="크라프트지"
									isSelected={selectedOptions.includes("KRAFT_PAPER")}
									onClick={() => onOptionSelect("KRAFT_PAPER")}
								/>
								<PaperOptionCard
									number={2}
									paper="Color paper"
									description="컬러 종이"
									isSelected={selectedOptions.includes("COLOR_PAPER")}
									onClick={() => onOptionSelect("COLOR_PAPER")}
								/>
								<PaperOptionCard
									number={3}
									paper="CLEAR_VINYL"
									description="투명 비닐"
									isSelected={selectedOptions.includes("CLEAR_VINYL")}
									onClick={() => onOptionSelect("CLEAR_VINYL")}
								/>
							</div>
                        ) : questionNumber === 7 ? (
                            <ColorOptionCard
                                selectedValue={selectedOptions[0] ?? "none"}
                                onChange={(value) => onOptionSelect(value)}
                            />
						) : questionNumber === 8 ? (
							<div className="flex flex-wrap justify-center gap-6">
								<DecorationOptionCard
									number={1}
									decoration="None"
									description="장식 없이 포장만"
									isSelected={selectedOptions.includes("None")}
									onClick={() => onOptionSelect("None")}
								/>
								<DecorationOptionCard
									number={2}
									decoration="Special Detail"
									description="장식 달기"
									isSelected={selectedOptions.includes("Special Detail")}
									onClick={() => onOptionSelect("Special Detail")}
								/>
							</div>
                        ) : questionNumber === 9 ? (
                            <DecoOptionCard
                                selectedPoint={decoPoint}
                                selectedColor={decoColor}
                                onPointChange={(value) => setDecoPoint(value)}
                                onColorChange={(value) => setDecoColor(value)}
                            />
						) : (
							// 기본 옵션 버튼 렌더링
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-1.5 gap-y-4 place-items-center">
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
					</motion.div>
				</AnimatePresence>
			</div>

			{/* 네비게이션 버튼들 */}
			<div className="absolute bottom-17 left-25 right-25 flex justify-between items-center">
				{/* 이전 버튼 (첫 번째 질문이 아닐 때만) */}
				{onPrevious && questionNumber > 1 && (
					<NavigationButton direction="left" onClick={handlePrevious} />
				)}

				<div className="flex-1"></div>

				{/* 다음 버튼 */}
				<NavigationButton
					direction="right"
					onClick={handleNext}
					disabled={questionNumber === 9 ? !(decoPoint && decoColor) : !canProceed}
				/>
			</div>
		</div>
	);
};

export default QuestionStep;
