import { useState } from "react";
import { motion } from "framer-motion";
import { flowerCardData } from "../../../data/flowerCardData";
import FlowerCard from "./FlowerCard";
import PageButton from "./PageButton";

export default function FlowerGrid() {
	const [currentPage, setCurrentPage] = useState(0);
	const [hoveredCard, setHoveredCard] = useState<{ rowIdx: number; colIdx: number } | null>(null);

	const CARDS_PER_PAGE = 15;
	const totalPages = Math.ceil(flowerCardData.length / CARDS_PER_PAGE);

	const startIndex = currentPage * CARDS_PER_PAGE;
	const endIndex = startIndex + CARDS_PER_PAGE;
	const currentCards = flowerCardData.slice(startIndex, endIndex);

	// 거리에 따른 영향도 계산 함수
	const calculateInfluence = (hoveredColIdx: number, currentColIdx: number) => {
		if (!hoveredCard) return { y: 0, scale: 1 };
		const distance = Math.abs(currentColIdx - hoveredColIdx);
		if (distance === 0) return { y: 14, scale: 1.16 }; // 호버된 카드는 14px 아래로 + 15% 확대
		if (distance === 1) return { y: 8, scale: 1.08 }; // 인접한 카드는 10px + 10% 확대
		if (distance === 2) return { y: 4, scale: 1.04 };  // 2칸 떨어진 카드는 4px + 5% 확대
		return { y: 0, scale: 1 }; // 그 외는 영향 없음
	};

	const goToNextPage = () => {
		setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
	};

	const goToPreviousPage = () => {
		setCurrentPage((prev) => Math.max(prev - 1, 0));
	};

	return (
		<>
			<div className="w-full max-w-3xl h-[32em] flex flex-col items-center justify-center gap-4 mb-[9.5em]">
				{/* 5x3 그리드 */}
				<div className="flex flex-col gap-13 items-center">
					{[0, 1, 2].map((rowIdx) => (
						<div key={rowIdx} className="grid grid-cols-5 gap-11">
							{currentCards.slice(rowIdx * 5, rowIdx * 5 + 5).map((card, i) => {
								const baseRotation = [10.559, 3.791, 0, -3.791, -10.559][i];
								const baseTranslateY = [-25, -10, 0, -10, -25][i];
								
								// 현재 카드가 호버된 행에 있는지 확인하고 영향도 계산
								const isInHoveredRow = hoveredCard?.rowIdx === rowIdx;
								const influence = isInHoveredRow ? calculateInfluence(hoveredCard.colIdx, i) : { y: 0, scale: 1 };
								const targetY = baseTranslateY + influence.y;
								const targetScale = influence.scale;
								
								return (
									<motion.div
										key={card.id}
										initial={{ 
											y: baseTranslateY,
											rotate: baseRotation,
											scale: 1,
											opacity: 1 
										}}
										animate={{ 
											y: targetY,
											rotate: baseRotation,
											scale: targetScale,
											opacity: 1 
										}}
										transition={{
											type: "spring",
											stiffness: 180,
											damping: 8,
											mass: 0.8,
											bounce: 0.4,
										}}
										onMouseEnter={() => setHoveredCard({ rowIdx, colIdx: i })}
										onMouseLeave={() => setHoveredCard(null)}
									>
										<FlowerCard
											flower={card}
										/>
									</motion.div>
								);
							})}
						</div>
					))}
				</div>
			</div>

			<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 gap-[160px] w-full flex flex-row justify-center items-center">
				{/* 왼쪽 화살표 버튼 */}
				<PageButton
					direction="left"
					onClick={goToPreviousPage}
					disabled={currentPage === 0}
				/>

				{/* 페이지 번호 레이블 */}
				<span
					className="font-bold text-[#868686] text-lg w-12 text-center"
					style={{ fontFamily: "NEXONLv1Gothic" }}
				>
					{currentPage + 1} / {totalPages}
				</span>

				{/* 오른쪽 화살표 버튼 */}
				<PageButton
					direction="right"
					onClick={goToNextPage}
					disabled={currentPage >= totalPages - 1}
				/>
			</div>
		</>
	);
}
