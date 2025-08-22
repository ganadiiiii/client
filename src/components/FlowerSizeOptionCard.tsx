import React, { useState } from "react";

interface FlowerSizeOptionCardProps {
	number: number;
	size: string;
	description: string;
	flowerImg: string;
	isSelected: boolean;
	onClick: () => void;
}

const dotColors = ["#F7DFDD", "#FEFBC6", "#D1DCE2"];

const FlowerSizeOptionCard: React.FC<FlowerSizeOptionCardProps> = ({
	number,
	size,
	description,
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
			className="relative w-[335px] h-[431px] transition-all duration-300 hover:scale-105"
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
				className="absolute left-[20px] top-[23px] w-[297px] h-[329px] rounded-[27px] z-10"
				style={{
					backgroundImage: "url('./src/assets/generate/size.svg')",
				}}
			/>

			{/* 꽃 이미지 */}
			<img
				src={flowerImg}
				alt={description}
				className="absolute left-[49px] top-[52px] w-[227px] h-[272px] object-cover rounded-sm z-30"
			/>

			{/* 원들 표시 */}
			<div className="absolute top-[24px] left-[34px] flex gap-[13px] z-20">
				{Array.from({ length: number }).map((_, idx) => (
					<div
						key={idx}
						className="w-[18px] h-[18px] rounded-full"
						style={{
							backgroundColor: dotColors[idx],
						}}
					/>
				))}
			</div>

			{/* 사이즈 */}
			<div
				className="absolute left-[31px] top-[376px] text-black z-20"
				style={{
					fontFamily: "Pretendard",
					fontSize: "14px",
					fontWeight: "400",
					lineHeight: "1.18",
					letterSpacing: "6%",
				}}
			>
				{size}
			</div>

			{/* 점선 */}
			<div
				className="absolute left-[29px] top-[365px] w-[286px] h-0 border-t border-dashed border-[#D9D9D9] z-20"
				style={{
					borderWidth: "1.07px",
				}}
			/>

			{/* 설명 */}
			<div
				className="absolute right-[17px] top-[376px] text-black text-right z-20"
				style={{
					fontFamily: "Pretendard",
					fontSize: "14px",
					fontWeight: "400",
					lineHeight: "1.18",
					letterSpacing: "6%",
				}}
			>
				{description}
			</div>
			{/* 점선 */}
			<div
				className="absolute left-[29px] top-[405px] w-[286px] h-0 border-t border-dashed border-[#D9D9D9] z-20"
				style={{
					borderWidth: "1.07px",
				}}
			/>
		</div>
	);
};

export default FlowerSizeOptionCard;
