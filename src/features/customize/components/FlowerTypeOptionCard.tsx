import React, { useState } from "react";

interface FlowerTypeOptionCardProps {
	number: string;
	name: string;
	engName: string;
	colorMeanings: { color: string; meaning: string }[];
	flowerImg: string;
	isSelected: boolean;
	onClick: () => void;
}

const FlowerTypeOptionCard: React.FC<FlowerTypeOptionCardProps> = ({
	number,
	name,
	engName,
	colorMeanings,
	flowerImg,
	isSelected,
	onClick,
}) => {
	const [rotation, setRotation] = useState(0);
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		const rotationList = [-2, -1, 1, 2];
		const randomIndex = Math.floor(Math.random() * 4);
		const randomRotation = rotationList[randomIndex];
		setRotation(randomRotation);
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<div
			className="relative w-[205px] h-[320px] transition-all rounded-[21px] duration-100 shadow-[1.9px_1.9px_3.2px_0px_rgba(0,0,0,0.1)] hover:shadow-[3px_3px_6px_0px_rgba(0,0,0,0.15)] hover:scale-105"
			onClick={onClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			style={{
				filter: isSelected ? "none" : "none",
				transform: isHovered ? `rotate(${rotation}deg)` : "rotate(0deg)",
			}}
		>
			{/* 카드 배경 */}
			<div
				className={`absolute inset-0 rounded-[21px] shadow-sm z-0 transition-colors duration-300 ${
					isSelected ? "bg-[#FFD1D4]" : "bg-white"
				}`}
				style={{
					boxShadow: "1.9px 1.9px 3.2px 0px rgba(0, 0, 0, 0.1)",
				}}
			/>

			{/* 그라데이션 영역 */}
			<div
				className="absolute left-[12px] top-[14px] w-[181px] h-[201px] rounded-[17px] z-10"
				style={{
					backgroundImage: "url('./src/assets/generate/type.svg')",
				}}
			/>

			{/* 꽃 이미지 */}
			<img
				src={flowerImg}
				alt={name}
				className="absolute left-[46px] top-[47px] w-[101px] h-[172px] object-cover rounded-sm z-30"
			/>

			{/* NO. 텍스트 */}
			<div
				className="absolute left-[20px] top-[16px] text-black z-20"
				style={{
					fontFamily: "Yidstreet",
					fontSize: "8.7px",
					fontWeight: "700",
					lineHeight: "1.18",
					letterSpacing: "5%",
				}}
			>
				NO. {number}
			</div>

			{/* 영문명 */}
			<div
				className="absolute left-[20px] top-[229px] text-black z-20"
				style={{
					fontFamily: "Yidstreet",
					fontSize: "11.4px",
					fontWeight: "700",
					lineHeight: "1.18",
					letterSpacing: "5%",
				}}
			>
				{engName}
			</div>

			{/* 점선 */}
			<div
				className="absolute left-[18px] top-[248px] w-[175px] h-0 border-t border-dashed border-[#D9D9D9] z-20"
				style={{
					borderWidth: "0.67px",
				}}
			/>

			{/* 한글명 */}
			<div
				className="absolute right-[12px] top-[231px] text-black text-right z-20"
				style={{
					fontFamily: "Pretendard",
					fontSize: "8.7px",
					fontWeight: "600",
					lineHeight: "1.19",
					letterSpacing: "5%",
				}}
			>
				{name}
			</div>

			{/* 색상별 의미 */}
			<div className="absolute left-[18px] top-[256px] space-y-[4px] w-[175px] z-20">
				{colorMeanings.map((item, idx) => (
					<div key={idx} className="flex justify-between">
						<div
							className="text-black"
							style={{
								fontFamily: "Yidstreet",
								fontSize: "8.7px",
								fontWeight: "300",
								lineHeight: "1.18",
								letterSpacing: "5%",
							}}
						>
							• {item.color}
						</div>
						<div
							className="text-black"
							style={{
								fontFamily: "Pretendard",
								fontSize: "8.7px",
								fontWeight: "400",
								lineHeight: "1.19",
								letterSpacing: "5%",
							}}
						>
							{item.meaning}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default FlowerTypeOptionCard;
