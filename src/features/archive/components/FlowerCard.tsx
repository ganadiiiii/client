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

	// 이미지 로드 에러 핸들러
	const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
		e.currentTarget.src = "/src/assets/generate/result/temp-flower.png"; // 기본 이미지
	};

	// 안전한 backgroundColors 처리
	const backgroundColors = flower.backgroundColors || ["#FFB6C1", "#FFC0CB"];
	const color1 = backgroundColors[0] || "#FFB6C1";
	const color2 = backgroundColors[1] || "#FFC0CB";
	const color3 = backgroundColors[2] || "#FFC0CB";
	const color4 = backgroundColors[3] || "#FFC0CB";

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
						backgroundImage: `conic-gradient(from 0deg in oklab, ${color1}66 28%, ${color2} 46%, ${color3} 83%, ${color4}25 100%)`,
					}}
				/>
				{/* 중앙 흰색 반투명 원 */}
				<div
					className="absolute z-15"
					style={{
						left: "50%",
						top: "50%",
						transform: "translate(-50%, -50%) translateY(0.5em)",
						width: "4.8em",
						height: "4.8em",
						borderRadius: "50%",
						background: "linear-gradient(rgba(255, 255, 255, 0.5) 0%, rgba(244, 244, 244, 0.6) 100%)",
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
			{flower.imageUrl ? (
				<img
					src={flower.imageUrl}
					alt={`Flower ${flower.cardId}`}
					className="absolute object-contain rounded-sm z-20"
					style={{
						left: "50%",
						transform: "translateX(-50%)",
						top: "1.5em",
						height: "6.375em",
						maxWidth: "5.5em",
					}}
					onError={handleImageError}
				/>
			) : (
				<div
					className="absolute z-20 flex items-center justify-center text-gray-400 text-xs"
					style={{
						left: "50%",
						transform: "translateX(-50%)",
						top: "1.5em",
						height: "6.375em",
						width: "5em",
					}}
				>
					No Image
				</div>
			)}
		</div>
	);
};

export default FlowerCard;
