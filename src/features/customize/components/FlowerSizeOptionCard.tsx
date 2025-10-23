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
			className={`relative cursor-pointer shadow-[1.9px_1.9px_3.2px_0px_rgba(0,0,0,0.1)] rounded-[1.5em] z-0 transition-colors duration-300 ${isSelected ? "bg-[#FFD1D4]" : "bg-white"}`}
			style={{
				width: "17em",
				height: "22em",
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
					className="absolute rounded-[1.7em] z-10 bg-cover bg-no-repeat bg-center"
					style={{
						left: "1em",
						top: "1.175em",
						width: "15em",
						height: "16.7em",
						backgroundImage: `url('/assets/generate/size.svg')`,
					}}
				/>

				{/* 꽃 이미지 */}
				<img
					src={`/assets/generate/size-${number}.png`}
					alt={description}
					className="absolute object-cover rounded-sm z-30"
					style={{
						left: "50%",
						top: "2.5em",
						height: "14em",
						transform: `translateX(-50%) scale(${
							number === 1 ? 0.8 : number === 3 ? 1.1 : 1
						})`,
					}}
				/>

				{/* 원들 표시 */}
				<div className="absolute top-[1.175em] left-[1.5em] flex gap-[0.9em] 3xl:gap-[0.75em] z-20">
					{Array.from({ length: number }).map((_, idx) => (
						<div
							key={idx}
							className="w-3.5 h-3.5 rounded-full"
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
					left: "1.5em",
					top: "22em",
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
					left: "1em",
					top: "18.5em",
					width: "15em",
					height: "0em",
					borderWidth: "1.07px",
				}}
			/>

			{/* 설명 */}
			<div
				className="absolute text-black text-right z-20"
				style={{
					right: "1.25em",
					top: "22em",
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
					left: "1em",
					top: "21em",
					width: "15em",
					height: "0em",
					borderWidth: "1.07px",
				}}
			/>
		</motion.div>
	);
};

export default FlowerSizeOptionCard;
