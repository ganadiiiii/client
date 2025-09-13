import { useState } from "react";
import PageButton from "./PageButton";
import FlowerCard from "./FlowerCard";
import { flowerCardData } from "../../../data/flowerCardData";

export default function FlowerGrid() {
	const [currentPage, setCurrentPage] = useState(0);

	const CARDS_PER_PAGE = 15;
	const totalPages = Math.ceil(flowerCardData.length / CARDS_PER_PAGE);

	const startIndex = currentPage * CARDS_PER_PAGE;
	const endIndex = startIndex + CARDS_PER_PAGE;
	const currentCards = flowerCardData.slice(startIndex, endIndex);

	const goToNextPage = () => {
		setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
	};

	const goToPreviousPage = () => {
		setCurrentPage((prev) => Math.max(prev - 1, 0));
	};

	return (
		<div className="absolute top-1/2 left-1/2 w-full max-w-3xl px-14 pt-46 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-4">
			{/* 5x3 그리드 */}
			<div className="flex flex-col gap-12 items-center">
				{[0, 1, 2].map((rowIdx) => (
					<div key={rowIdx} className="grid grid-cols-5 gap-6">
						{currentCards.slice(rowIdx * 5, rowIdx * 5 + 5).map((card, i) => (
							<FlowerCard
								key={card.id}
								flower={card}
								style={{
									transform: `translateY(${[-14, -3, 0, -3, -14][i]}px) rotate(${[10.559, 3.791, 0, -3.791, -10.559][i]}deg)`,
								}}
							/>
						))}
					</div>
				))}
			</div>

			<div className="flex items-center justify-center gap-[160px] mt-[110px]">
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
		</div>
	);
}
