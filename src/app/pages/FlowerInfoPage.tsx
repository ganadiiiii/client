import { Link, useNavigate, useParams } from "react-router-dom";
import GradientIconButton from "../../components/button/GradientIconButton";
import { flowerCardData } from "../../data/flowerCardData";
import iconShare from "../../assets/archive/icon-share.svg";
import iconShareHover from "../../assets/archive/icon-share-hover.svg";
import { useState } from "react";
import FlowerInfoCard from "../../features/archive/components/FlowerInfoCard";
import bg from "../../assets/archive/info-bg.svg";
import SimpleIconButton from "../../components/button/SimpleIconButton";
import iconBack from "../../assets/generate/result/icon-back.svg";

const FlowerInfoPage = () => {
	const { flowerId } = useParams();
	const navigate = useNavigate();
	const [showSharePopup, setShowSharePopup] = useState(false);
	const flower = flowerCardData.find((f) => f.id === String(flowerId));
	if (!flower) {
		return (
			<main className="min-h-screen flex items-center justify-center p-6">
				<div className="text-center">
					<h1 className="text-2xl font-bold mb-2">꽃 정보를 찾을 수 없어요</h1>
					<p className="text-gray-600 mb-6">요청하신 ID: {flowerId}</p>
					<Link to="/archive" className="text-rose-500 underline font-semibold">
						보관함으로 돌아가기
					</Link>
				</div>
			</main>
		);
	}
	return (
		<div
			className="relative w-screen min-h-screen flex flex-col items-center justify-center bg-[#FCFBF6] bg-cover bg-center bg-no-repeat"
			style={{
				backgroundImage: `url(${bg})`,
			}}
		>
			<div className="flex flex-col items-center transition-all duration-300">
				{/* 제목 */}
				<h1
					className="text-3xl font-bold text-gray mb-6 z-40 mt-20"
					style={{ fontFamily: "NexonLv1Gothic" }}
				>
					꽃다발 정보
				</h1>

				{/* Final result card with message */}
				<div className="relative inline-block">
					<SimpleIconButton
						onClick={() => navigate(-1)}
						icon={iconBack}
						className="absolute left-[-5em] top-[0.625em]"
					/>
					<FlowerInfoCard flowerCard={flower} />

					{/* Action button */}
					<div className="relative mt-4 w-full flex justify-center">
						<GradientIconButton
							onClick={() => setShowSharePopup(!showSharePopup)}
							icon={iconShare}
							hoverIcon={iconShareHover}
							label="공유하기"
							disabled={false}
						/>
						{showSharePopup && (
							<div
								className="absolute bottom-full mb-2 rounded-2xl bg-white text-sm text-dark-gray z-50 border border-gray/40 overflow-hidden whitespace-nowrap"
								style={{ fontFamily: "NexonLv1Gothic" }}
								role="menu"
								aria-label="send options"
							>
								<button
									onClick={() => {
										setShowSharePopup(false);
									}}
									className="block w-full text-center text-base py-5 px-12 hover:bg-gray/20"
									style={{ fontFamily: "NexonLv1Gothic" }}
									role="menuitem"
								>
									주문하기
								</button>
								<button
									onClick={() => {
										setShowSharePopup(false);
									}}
									className="block w-full text-center text-base py-5 px-12 hover:bg-gray/20 border-t border-gray/40"
									style={{ fontFamily: "NexonLv1Gothic" }}
									role="menuitem"
								>
									저장하기
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default FlowerInfoPage;
