import React from "react";
import { useNavigate } from "react-router-dom";
import iconHome from "../../../assets/generate/result/icon-home.svg";
import iconHomeHover from "../../../assets/generate/result/icon-home-hover.svg";
import iconOrder from "../../../assets/generate/result/icon-order.svg";
import iconOrderHover from "../../../assets/generate/result/icon-order-hover.svg";
import iconSave from "../../../assets/generate/result/icon-save.svg";
import iconSaveHover from "../../../assets/generate/result/icon-save-hover.svg";
import type { FlowerCard } from "../../../types/FlowerCard";
import GradientIconButton from "../components/GradientIconButton";
import ResultSentCard from "../components/ResultSentCard";
import SimpleIconButton from "../components/SimpleIconButton";

interface SentResultSectionProps {
	flowerCard: FlowerCard;
}

const SentResultSection: React.FC<SentResultSectionProps> = ({
	flowerCard,
}) => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center transition-all duration-300">
			{/* 제목 */}
			<h1
				className="text-3xl font-bold text-gray mb-6 z-40 mt-20"
				style={{ fontFamily: "NexonLv1Gothic" }}
			>
				디자인 결과
			</h1>

			{/* Final result card with message */}
			<div className="relative inline-block">
				<ResultSentCard flowerCard={flowerCard} />

				{/* Action buttons */}
				<div className="mt-6 w-full flex justify-center">
					<div className="grid grid-cols-3 gap-4">
						<SimpleIconButton
							onClick={() => navigate("/archive")}
							icon={iconHome}
							hoverIcon={iconHomeHover}
							label="아카이빙"
						/>
						<GradientIconButton
							onClick={() => {
								navigate(-1);
							}}
							icon={iconOrder}
							hoverIcon={iconOrderHover}
							label="실물 보내기"
							disabled={false}
						/>
						<SimpleIconButton
							onClick={() => navigate(-1)}
							icon={iconSave}
							hoverIcon={iconSaveHover}
							label="저장하기"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SentResultSection;
