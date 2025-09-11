import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bg from "../../assets/generate/result/bg.png";
import SentResultSection from "../../features/customize/sections/SentResultSection";
import type { FlowerCard } from "../../types/FlowerCard";

const ResultSentPage: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();

	// Get flower card data from navigation state
	const flowerCard = location.state?.flowerCard as FlowerCard;

	// If no flower card data, redirect back to customizing
	if (!flowerCard) {
		navigate("/customizing");
		return null;
	}

	return (
		<div
			className="relative w-screen min-h-screen flex flex-col items-center justify-center bg-[#FCFBF6] bg-cover bg-center bg-no-repeat"
			style={{
				backgroundImage: `url(${bg})`,
			}}
		>
			<SentResultSection flowerCard={flowerCard} />
		</div>
	);
};

export default ResultSentPage;
