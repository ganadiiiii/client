import { useState } from "react";
import Mailbox from "../../features/archive/components/mailbox";

const FlowerCard = ({ flower }: { flower: { id: number; name: string } }) => {
	return (
		<div className="h-[140px] aspect-[4/5] bg-white/60 hover:bg-white rounded-lg flex flex-col items-center justify-center border-2 border-[#FFD1D4] shadow-md p-2 hover:shadow-xl hover:border-[#FF6E77] transition-all duration-200 cursor-pointer">
			<p className="text-sm font-bold text-[#FF6E77] text-center">
				{flower.name}
			</p>
		</div>
	);
};

const mockFlowerData = Array.from({ length: 25 }, (_, i) => ({
	id: i + 1,
	name: `꽃 #${i + 1}`,
}));

const ArchivePage = () => {
	const [currentPage, setCurrentPage] = useState(0);
	const CARDS_PER_PAGE = 15;
	const totalPages = Math.ceil(mockFlowerData.length / CARDS_PER_PAGE);

	const startIndex = currentPage * CARDS_PER_PAGE;
	const endIndex = startIndex + CARDS_PER_PAGE;
	const currentCards = mockFlowerData.slice(startIndex, endIndex);

	const goToNextPage = () => {
		setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
	};

	const goToPreviousPage = () => {
		setCurrentPage((prev) => Math.max(prev - 1, 0));
	};

	return (
		<main className="overflow-hidden">
			<div
				className="relative w-full h-screen bg-cover bg-center bg-no-repeat flex justify-center pt-[139px]"
				style={{
					backgroundImage: `url(/src/assets/archive/bg.svg)`,
				}}
			>
				{/* 배경 역할을 하는 home 이미지 */}
				<div className="relative">
					<img
						src="/src/assets/archive/home.svg"
						alt="Home background"
						className="max-w-full h-auto"
					/>

					{/* --- 그리드 및 네비게이션을 포함하는 오버레이 컨테이너 --- */}
					<div className="absolute top-1/2 left-1/2 w-full max-w-3xl px-14 pt-46 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-4">
						{/* 5x3 그리드 */}
						<div className="flex-1 h-full mx-4 grid grid-cols-5 grid-rows-3 gap-x-6 gap-y-4 w-full">
							{currentCards.map((card) => (
								<FlowerCard key={card.id} flower={card} />
							))}
						</div>

						<div className="flex items-center justify-center gap-4 mt-[110px]">
							{/* 왼쪽 화살표 버튼 */}
							<button
								onClick={goToPreviousPage}
								disabled={currentPage === 0}
								className="p-3 bg-white/60 rounded-full shadow-lg hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 text-gray-700"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 19l-7-7 7-7"
									/>
								</svg>
							</button>

							{/* 페이지 번호 레이블 */}
							<span
								className="font-bold text-[#868686] text-lg w-12 text-center"
								style={{ fontFamily: "NEXON Lv1 Gothic OTF" }}
							>
								{currentPage + 1} / {totalPages}
							</span>

							{/* 오른쪽 화살표 버튼 */}
							<button
								onClick={goToNextPage}
								disabled={currentPage >= totalPages - 1}
								className="p-3 bg-white/60 rounded-full shadow-lg hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 text-gray-700"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
			<Mailbox />
		</main>
	);
};

export default ArchivePage;
