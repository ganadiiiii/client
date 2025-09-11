import { motion } from "framer-motion";
import React, { useState } from "react";

interface FlowerTypeOptionCardProps {
	number: string;
	name: string;
	engName: string;
	colorMeanings: { color: string; meaning: string }[];
	isSelected: boolean;
	onClick: () => void;
}

const FlowerTypeOptionCard: React.FC<FlowerTypeOptionCardProps> = ({
	number,
	name,
	engName,
	colorMeanings,
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
			className={`relative p-12 cursor-pointer shadow-[1.9px_1.9px_3.2px_0px_rgba(0,0,0,0.1)] rounded-[1.3em] shadow-sm transition-colors duration-300 ${isSelected ? "bg-primary/40" : "bg-white"}`}
			style={{ width: "12.8em", height: "20em" }}
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
			<div>
				{/* gradation */}
				<div
					className="absolute rounded-[1.1em] z-10"
					style={{
						left: "0.75em",
						top: "0.9em",
						width: "11.3em",
						height: "12.6em",
						backgroundImage: `url('./src/assets/generate/bg-${number}.svg')`,
						backgroundRepeat: "no-repeat",
						backgroundSize: "100% 100%",
						backgroundPosition: "center",
					}}
				/>
				{/* flower image */}
				<img
					src={`./src/assets/generate/flower-${number}.png`}
					alt={name}
					className="absolute object-cover rounded-sm z-20"
					style={{
						left: "50%",
						transform: "translateX(-50%)",
						top: "2em",
						height: "10.8em",
					}}
				/>
			</div>
			{/* NO. 텍스트 */}
			<div
				className="absolute text-black z-10"
				style={{
					left: "2em",
					top: "1.75em",
					fontFamily: "Yidstreet",
					fontSize: "0.54rem",
					fontWeight: "700",
					lineHeight: "1.18",
					letterSpacing: "5%",
				}}
			>
				NO. {number}
			</div>

			{/* 영문명 */}
			<div
				className="absolute text-black z-20"
				style={{
					left: "2em",
					top: "20em",
					fontFamily: "Yidstreet",
					fontSize: "0.71em",
					fontWeight: "700",
					lineHeight: "1.18",
					letterSpacing: "5%",
				}}
			>
				{engName}
			</div>

			{/* 점선 */}
			<div
				className="absolute border-t border-dashed border-[#D9D9D9] z-20"
				style={{
					left: "1.2em",
					top: "15.4em",
					width: "10.9em",
					height: "0em",
					borderWidth: "0.67px",
				}}
			/>

			{/* 한글명 */}
			<div
				className="absolute text-black text-right z-20"
				style={{
					right: "1.5em",
					top: "26.5em",
					fontFamily: "Pretendard",
					fontSize: "0.54rem",
					fontWeight: "600",
					lineHeight: "1.19",
					letterSpacing: "5%",
				}}
			>
				{name}
			</div>

			{/* 색상별 의미 */}
			<div
				className="absolute space-y-[0.25em] z-20"
				style={{
					left: "1.1em",
					top: "16em",
					width: "10.9em",
				}}
			>
				{colorMeanings.map((item, idx) => (
					<div key={idx} className="flex justify-between">
						<div
							className="text-black"
							style={{
								fontFamily: "Yidstreet",
								fontSize: "0.54rem",
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
								fontSize: "0.54rem",
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
		</motion.div>
	);
};

export default FlowerTypeOptionCard;
