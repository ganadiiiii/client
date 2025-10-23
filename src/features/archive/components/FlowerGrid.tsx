import { useState } from "react";
import { motion } from "framer-motion";
import type { FlowerCard as FlowerCardType } from "../../../types/FlowerCard";
import FlowerCard from "./FlowerCard";

interface FlowerGridProps {
	cards: FlowerCardType[];
	isLoading: boolean;
	triggerCardLanding?: boolean;
}

export default function FlowerGrid({ 
	cards, 
	isLoading,
	triggerCardLanding = false,
}: FlowerGridProps) {
	const [hoveredCard, setHoveredCard] = useState<{ rowIdx: number; colIdx: number } | null>(null);

	const currentCards = cards;

	// 거리에 따른 영향도 계산 함수
	const calculateInfluence = (hoveredColIdx: number, currentColIdx: number) => {
		if (!hoveredCard) return { y: 0, scale: 1 };
		const distance = Math.abs(currentColIdx - hoveredColIdx);
		if (distance === 0) return { y: 14, scale: 1.16 }; // 호버된 카드는 14px 아래로 + 15% 확대
		if (distance === 1) return { y: 8, scale: 1.08 }; // 인접한 카드는 10px + 10% 확대
		if (distance === 2) return { y: 4, scale: 1.04 };  // 2칸 떨어진 카드는 4px + 5% 확대
		return { y: 0, scale: 1 }; // 그 외는 영향 없음
	};

	// 카드 착지 애니메이션을 위한 영향도 계산 함수
	const calculateLandingInfluence = (colIdx: number) => {
		const distance = Math.abs(colIdx - 0); // 첫 번째 카드(인덱스 0)와의 거리
		if (distance === 0) return { y: 0, scale: 0.80, rotateX: 10}; // 첫 번째 카드는 20px 아래로 + 15% 축소
		if (distance === 1) return { y: 0, scale: 0.85 }; // 인접한 카드는 12px 아래로 + 8% 축소
		if (distance === 2) return { y: 0, scale: 0.90 };  // 2칸 떨어진 카드는 6px 아래로 + 4% 축소
		if (distance === 3) return { y: 0, scale: 0.95 };  // 2칸 떨어진 카드는 6px 아래로 + 4% 축소
		return { y: 0, scale: 1 }; // 그 외는 영향 없음
	};

	return (
		<div className="w-full max-w-3xl h-[32em] flex flex-col items-center justify-start gap-4 mb-[9.5em]">
				{isLoading ? (
					<div className="flex items-center justify-center h-full">
						<span className="text-gray-500">로딩 중...</span>
					</div>
				) : currentCards.length === 0 ? (
					<div className="flex items-center justify-center h-full">
						<span className="text-gray-500">카드가 없습니다</span>
					</div>
				) : (
					/* 5x3 그리드 */
					<div className="flex flex-col gap-13 items-center">
						{[0, 1, 2].map((rowIdx) => (
							<div key={rowIdx} className="grid grid-cols-5 gap-11">
								{currentCards.slice(rowIdx * 5, rowIdx * 5 + 5).map((card, i) => {
									const baseRotation = [10.559, 3.791, 0, -3.791, -10.559][i];
									const baseTranslateY = [-25, -10, 0, -10, -25][i];
									
									// 현재 카드가 호버된 행에 있는지 확인하고 영향도 계산
									const isInHoveredRow = hoveredCard?.rowIdx === rowIdx;
									const hoverInfluence = isInHoveredRow ? calculateInfluence(hoveredCard.colIdx, i) : { y: 0, scale: 1 };
									
									// 카드 착지 애니메이션 영향도 계산 (첫 번째 행에만 적용)
									const landingInfluence = (triggerCardLanding && rowIdx === 0) 
										? calculateLandingInfluence(i) 
										: { y: 0, scale: 1 };
									
									const targetY = baseTranslateY + hoverInfluence.y + landingInfluence.y;
									const targetScale = hoverInfluence.scale * landingInfluence.scale;
									
									return (
										<motion.div
											key={card.cardId}
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
												stiffness: 50,
												damping: 5,
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
				)}
		</div>
	);
}
