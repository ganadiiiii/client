import React from "react";
import { useNavigate } from "react-router-dom";
import type { FlowerCard as FlowerCardType } from "../../../types/FlowerCard";

interface FlowerCardProps {
	flower: FlowerCardType;
	style?: React.CSSProperties;
}

const FlowerCard = ({ flower, style }: FlowerCardProps) => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(`/archive/${flower.cardId}`);
	};

	// designAssetId에 따라 배경 이미지 선택 (1-9)
	const bgImageNumber = ((flower.designAssetId - 1) % 9) + 1;

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
						backgroundImage: `url('./src/assets/generate/bg-${bgImageNumber}.svg')`,
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center",
					}}
				/>
			</div>
			{/* NO. 텍스트 */}
			<div
				className="absolute text-dark-gray z-30 text-xs font-semibold"
				style={{
					left: "1em",
					top: "1em",
					fontFamily: "Yidstreet",
				}}
			>
				NO. {flower.cardId}
			</div>
			<img
				src={flower.imageUrl}
				alt={`Flower ${flower.cardId}`}
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
