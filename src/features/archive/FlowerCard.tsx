import React from "react";
import { useNavigate } from "react-router-dom";
import type { FlowerCard as FlowerCardType } from "../../types/FlowerCard";

interface FlowerCardProps {
	flower: FlowerCardType;
	style?: React.CSSProperties;
}

const FlowerCard = ({ flower, style }: FlowerCardProps) => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(`/archive/${flower.id}`);
	};

	return (
		<div
			className="relative cursor-pointer rounded-[0.7em] shadow-sm transition-colors duration-300 bg-white"
			style={{ width: "6.375em", height: "8.625em", ...style }}
			onClick={handleClick}
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
				className="absolute text-black z-30 text-xs"
				style={{
					left: "1.5em",
					top: "1.5em",
					fontFamily: "Yidstreet",
					fontWeight: "700",
					lineHeight: "normal",
					letterSpacing: "5%",
				}}
			>
				NO. {flower.id}
			</div>
			<img
				src={flower.flowerImg}
				alt={`Flower ${flower.id}`}
				className="absolute object-cover rounded-sm z-20"
				style={{
					left: "50%",
					transform: "translateX(-50%)",
					top: "1.5em",
					height: "6.375em",
				}}
			/>
		</div>
	);
};

export default FlowerCard;
