import { motion } from "framer-motion";
import React, { useState } from "react";

interface FlowerSizeOptionCardProps {
	number: number;
	size: string;
	description: string;
	isSelected: boolean;
	onClick: () => void;
}

const dotColors = ["#F7DFDD", "#FEFBC6", "#D1DCE2"];

const FlowerSizeOptionCard: React.FC<FlowerSizeOptionCardProps> = ({
	number,
	size,
	description,
	isSelected,
	onClick,
}) => {
	const [rotation, setRotation] = useState(0);

	const handleMouseEnter = () => {
		const rotationList = [-2, -1, 1, 2];
		const randomIndex = Math.floor(Math.random() * 4);
		const randomRotation = rotationList[randomIndex];
		setRotation(randomRotation);
	};

	return (
		<motion.div
			className={`relative cursor-pointer shadow-[1.9px_1.9px_3.2px_0px_rgba(0,0,0,0.1)] rounded-[21px] z-0 transition-colors duration-300 ${isSelected ? "bg-[#FFD1D4]" : "bg-white"}`}
			style={{
				width: "21em",
				height: "26.9em",
			}}
			onClick={onClick}
			onMouseEnter={handleMouseEnter}
			whileHover={{
				rotate: rotation,
				scale: 1.05,
				boxShadow: "0.2em 0.2em 0.4em rgba(0, 0, 0, 0.15)",
			}}
			transition={{
				rotate: { type: "spring", bounce: 0.6 },
				scale: { type: "tween", duration: 0.1 },
			}}
		>
			{/* 그라데이션 영역 */}
			<div>
				<div
					className="absolute rounded-[1.7em] z-10"
					style={{
						left: "1.25em",
						top: "1.44em",
						width: "18.5em",
						height: "20.5em",
						backgroundImage: "url('./src/assets/generate/size.svg')",
					}}
				/>

				{/* 꽃 이미지 */}
				<img
					src={`./src/assets/generate/size-${number}.png`}
					alt={description}
					className="absolute object-cover rounded-sm z-30"
					style={{
						left: "50%",
						transform: "translateX(-50%)",
						top: "5em",
						height: "13.75em",
					}}
				/>

				{/* 원들 표시 */}
				<div className="absolute top-[1.5em] left-[2.125em] flex gap-[1.5em] 2xl:gap-[0.81em] z-20">
					{Array.from({ length: number }).map((_, idx) => (
						<div
							key={idx}
							className="w-4 h-4 rounded-full"
							style={{
								backgroundColor: dotColors[idx],
							}}
						/>
					))}
				</div>
			</div>
			{/* 사이즈 */}
			<div
				className="absolute text-black z-20"
				style={{
					left: "2.1em",
					top: "26.9em",
					fontFamily: "Yidstreet",
					fontSize: "0.875em",
					fontWeight: "700",
					lineHeight: "1.18",
					letterSpacing: "6%",
				}}
			>
				{size}
			</div>

			{/* 점선 */}
			<div
				className="absolute border-t border-dashed border-[#D9D9D9] z-20"
				style={{
					left: "1.81em",
					top: "22.8em",
					width: "17.87em",
					height: "0em",
					borderWidth: "1.07px",
				}}
			/>

			{/* 설명 */}
			<div
				className="absolute text-black text-right z-20"
				style={{
					right: "1.5em",
					top: "27em",
					fontFamily: "Pretendard",
					fontSize: "0.875em",
					fontWeight: "400",
					lineHeight: "1.18",
					letterSpacing: "6%",
				}}
			>
				{description}
			</div>
			{/* 점선 */}
			<div
				className="absolute border-t border-dashed border-[#D9D9D9] z-20"
				style={{
					left: "1.81em",
					top: "25.2em",
					width: "17.87em",
					height: "0em",
					borderWidth: "1.07px",
				}}
			/>
		</motion.div>
	);
};

export default FlowerSizeOptionCard;
