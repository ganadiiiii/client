import React, { useState } from "react";
import bg from "../../assets/generate/card_bg.svg";
import Card from "../../features/archive/components/Card";

//임시
const cardData = {
	date: "2025.08.14",
	title: "TITLE 꽃다발",
	flowerImg: "/src/assets/generate/image179.png",
	mainFlowers: ["프리지아"],
	subFlowers: ["개나리", "해바라기"],
	floriography: "새로운 시작을 응원합니다",
	to: "seollhii",
	from: "baekhyunee",
};

const CustomizingCardPage: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<div
			className="relative flex flex-col items-center justify-center w-screen h-screen bg-background bg-cover bg-no-repeat bg-top"
			style={{
				backgroundImage: `url(${bg})`,
			}}
		>
			<div className="relative flex flex-col items-center justify-center mt-[248px] gap-10">
				{/* 제목 */}
				{/* <h1
					className="text-[28px] font-bold text-black/80 z-40"
					style={{ fontFamily: "NexonLv1Gothic", fontWeight: "700" }}
				>
					공유하기
				</h1> */}
				<div className="relative flex flex-col">
					<Card
						date={cardData.date}
						title={cardData.title}
						flowerImg={cardData.flowerImg}
						mainFlowers={cardData.mainFlowers}
						subFlowers={cardData.subFlowers}
						floriography={cardData.floriography}
						to={cardData.to}
						from={cardData.from}
					/>
				</div>
				<div className="relative">
					<button
						className="w-21 h-21 rounded-full flex items-center justify-center"
						onClick={() => setIsModalOpen(true)}
					>
						<img
							src="/src/assets/generate/sns.svg"
							alt="SNS"
							className="w-21 h-21"
						/>
					</button>
				</div>
			</div>
			{/* 모달 */}
			{isModalOpen && (
				<div
					className="fixed inset-0 flex items-center justify-center z-50"
					onClick={() => setIsModalOpen(false)}
				>
					<div
						className="w-[661px] h-[253px] bg-white rounded-[19px] flex flex-col items-center justify-center relative gap-6"
						style={{ boxShadow: "5px 10px 41.6px rgba(0, 0, 0, 0.17)" }}
					>
						<p
							className="text-xl text-black/80"
							style={{
								fontFamily: "NexonLv1Gothic",
								fontWeight: "700",
								fontSize: "25px",
							}}
						>
							공유
						</p>
						<div className="flex flex-wrap gap-12">
							<button className="w-23 h-23 rounded-full flex items-center justify-center bg-gray-200"></button>
							<button className="w-23 h-23 rounded-full flex items-center justify-center bg-gray-200"></button>
							<button className="w-23 h-23 rounded-full flex items-center justify-center bg-gray-200"></button>
							<button className="w-23 h-23 rounded-full flex items-center justify-center bg-gray-200"></button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CustomizingCardPage;
