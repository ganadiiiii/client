import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface FlowerCardProps {
	flower: {
		id: number;
		url: string;
	};
	style?: React.CSSProperties;
}


const FlowerCard = ({ flower, style }: FlowerCardProps) => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(`/archive/${flower.id}`);
	};
	const [rotation, setRotation] = useState(0);

	const handleMouseEnter = () => {
		const rotationList = [-2, -1, 1, 2];
		const randomIndex = Math.floor(Math.random() * 4);
		const randomRotation = rotationList[randomIndex];
		setRotation(randomRotation);
	};

	return (
		<motion.div
			className={`relative cursor-pointer shadow-[0px_0px_6.2px_0px_rgba(0,0,0,0.26)] rounded-[0.7em] shadow-sm transition-colors duration-300 bg-white`}
			style={{ width: "6.375em", height: "8.625em", ...style }}
			onClick={handleClick}
			onMouseEnter={handleMouseEnter}
			whileHover={{
				rotate: rotation,
				scale: 1.05,
			}}
			transition={{
				rotate: { type: "spring", bounce: 0.6 },
				scale: { type: "tween", duration: 0.1 },
			}}
		>
			<div>
				{/* gradation */}
				<div
					className="absolute rounded-[0.5em] z-10"
					style={{
						left: "0.375em",
						top: "0.56em",
						width: "5.625em",
						height: "7.6875em",
						backgroundImage: `url('./src/assets/generate/bg-1.svg')`,
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center",
					}}
				/>
			</div>
			{/* NO. 텍스트 */}
			<div
				className="absolute text-black z-10"
				style={{
					left: "3em",
					top: "2em",
					fontFamily: "Yidstreet",
					fontSize: "0.3rem",
					fontWeight: "700",
					lineHeight: "normal",
					letterSpacing: "5%",
				}}
			>
				NO. {flower.id}
			</div>
            <img
				src={flower.url}
				alt={`Flower ${flower.id}`}
				className="absolute object-cover rounded-sm z-20"
				style={{
					left: "50%",
					transform: "translateX(-50%)",
					top: "1.5em",
					height: "6.375em",
				}}
			/>
		</motion.div>
	);
};

export default FlowerCard;