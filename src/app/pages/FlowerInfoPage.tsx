import { domToPng } from "modern-screenshot";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import iconShare from "../../assets/archive/icon-share.svg";
import iconShareHover from "../../assets/archive/icon-share-hover.svg";
import bg from "../../assets/archive/info-bg.svg";
import iconBack from "../../assets/generate/result/icon-back.svg";
import GradientIconButton from "../../components/button/GradientIconButton";
import SimpleIconButton from "../../components/button/SimpleIconButton";
import FlowerInfoCard from "../../features/archive/components/FlowerInfoCard";
import iconTrash from "../../assets/archive/icon-trash.svg";
import iconTrashHover from "../../assets/archive/icon-trash-hover.svg";
import iconSend from "../../assets/archive/icon-send.svg";
import iconSendHover from "../../assets/archive/icon-send-hover.svg";
import { cardAPI } from "../../api";
import type { FlowerCard } from "../../types/FlowerCard";
import LoadingPage from "../../components/LoadingPage";

const FlowerInfoPage = () => {
	const { flowerId } = useParams();
	const navigate = useNavigate();
	const [showSharePopup, setShowSharePopup] = useState(false);
	const [flower, setFlower] = useState<FlowerCard | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const divRef = useRef<HTMLDivElement | null>(null);

	// API에서 카드 상세 정보 가져오기
	useEffect(() => {
		const fetchCardDetail = async () => {
			if (!flowerId) {
				setError("카드 ID가 없습니다.");
				setIsLoading(false);
				return;
			}

			try {
				setIsLoading(true);
				const response = await cardAPI.getCardDetail(flowerId);

				// API 응답이 SharedCardDetail 형태인 경우 처리
				if (response.card) {
					// SharedCardDetail 응답
					const flowerCardWithMessage: FlowerCard = {
						...response.card,
						message: response.note || undefined,
						sender: response.fromName || undefined,
						receiver: response.toName || undefined,
					};
					setFlower(flowerCardWithMessage);
				} else {
					// 직접 FlowerCard 응답
					setFlower(response);
				}
			} catch (error) {
				console.error("카드 상세 조회 실패:", error);
				setError("카드 정보를 불러오는데 실패했습니다.");
			} finally {
				setIsLoading(false);
			}
		};

		fetchCardDetail();
	}, [flowerId]);

	if (isLoading) {
		return <LoadingPage message="카드 정보를 불러오는 중" />;
	}

	if (error || !flower) {
		return (
			<main className="min-h-screen flex items-center justify-center p-6">
				<div className="text-center">
					<h1 className="text-2xl font-bold mb-2">꽃 정보를 찾을 수 없어요</h1>
					<p className="text-gray-600 mb-6">
						{error || `요청하신 ID: ${flowerId}`}
					</p>
					<Link to="/archive" className="text-rose-500 underline font-semibold">
						보관함으로 돌아가기
					</Link>
				</div>
			</main>
		);
	}

	const handleDownload = async () => {
	if (!divRef.current) return;

	try {
		const dataUrl = await domToPng(divRef.current);
		const link = document.createElement("a");
		link.download = "flower-card.png";
		link.href = dataUrl;
		link.click();
	} catch (error) {
		console.error("다운로드 실패:", error);
	}
};

	const handleDelete = async () => {
		if (!flower) return;

		try {
			await cardAPI.deleteCard(String(flower.cardId));
			navigate("/archive");
		} catch (error) {
			console.error("카드 삭제 실패:", error);
			alert("카드 삭제에 실패했습니다.");
		}
	};

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

					<div className="absolute left-[-5em] top-[0.625em] flex flex-col items-center gap-2">
						<SimpleIconButton
							onClick={() => navigate(-1)}
							icon={iconBack}
						/>

					</div>
					<div ref={divRef}>
						<FlowerInfoCard flowerCard={flower} />
					</div>

					{/* Action button */}

					<div className="mt-4 w-full flex justify-center">
						<div className="grid grid-cols-3 gap-4">
							<SimpleIconButton onClick={handleDelete} icon={iconTrashHover} hoverIcon={iconTrash} label="삭제하기" />

							<GradientIconButton
								onClick={() => navigate('/customizing')}
								icon={iconSend}
								hoverIcon={iconSendHover}
								label="나도 보내기"
								disabled={false}
							/>
							<div
								className="relative flex items-center justify-center"
							>
								<SimpleIconButton onClick={() => setShowSharePopup(!showSharePopup)} icon={iconShare} hoverIcon={iconShareHover} label="공유하기" />
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
												navigate("/order", { state: { flowerCard: flower } });
											}}
											className="block w-full text-center text-base py-5 px-12 hover:bg-gray/20"
											style={{ fontFamily: "NexonLv1Gothic" }}
											role="menuitem"
										>
											실물 보내기
										</button>
										<button
											onClick={() => {
												setShowSharePopup(false);
												handleDownload();
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
			</div>
		</div>
	);
};
export default FlowerInfoPage;
