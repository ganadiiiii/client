import saveAs from "file-saver";
import html2canvas from "html2canvas";
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
			// Front result card만을 위한 임시 div 생성
			const tempDiv = document.createElement("div");
			tempDiv.style.position = "absolute";
			tempDiv.style.left = "-9999px";
			tempDiv.style.top = "0";
			tempDiv.style.width = "24em";
			tempDiv.style.height = "37.0625em";
			tempDiv.style.fontSize = "16px";

			// Front result card HTML 직접 생성 (3D transform 없이)
			tempDiv.innerHTML = `
				<div style="width: 24em; height: 37.0625em;">
					<div style="
						position: relative;
						width: 100%;
						height: 100%;
						border-radius: 2.5rem;
						background-image: url(/assets/generate/card.png);
						background-repeat: no-repeat;
						background-size: 100% 100%;
						background-position: center;
					">
						<!-- 날짜 -->
						<div style="
							position: absolute;
							left: 2.8em;
							top: 2.5em;
							color: black;
							z-index: 20;
							font-size: 1.175rem;
							font-family: Yidstreet;
						">
							${new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').replace(/\.$/, '')}
						</div>
	
						<!-- 꽃 이미지 -->
						<div style="
							position: absolute;
							left: 45%;
							top: 13.75em;
							transform: translate(-50%, -50%);
							z-index: 10;
						">
							<img src="${flower.imageUrl}" alt="flower" style="height: 20em; object-fit: contain;" />
						</div>
	
						<!-- 제목 -->
						<div style="
							position: absolute;
							left: 1.6em;
							top: 16em;
							color: black;
							z-index: 20;
							font-weight: bold;
							font-size: 2rem;
							font-family: Yidstreet;
						">
							${flower.title}
						</div>
	
						<!-- 메인/서브 꽃 -->
						<div style="
							position: absolute;
							left: 2.8em;
							top: 31.5em;
							color: black;
							font-size: 1.175rem;
						">
							<div style="display: flex; flex-direction: row; gap: 10px; margin-bottom: 5px;">
								<span style="font-family: Yidstreet; font-weight: 600;">Main</span>
								<span style="font-family: NexonLv1Gothic; font-weight: 400;">${flower.mainFlower?.koreanName || ""}</span>
								<span style="font-family: Yidstreet; font-weight: 600;">Sub</span>
								<span style="font-family: NexonLv1Gothic; font-weight: 400;">${flower.subFlower?.koreanName || ""}</span>
							</div>
							<div style="display: flex; flex-direction: row; gap: 10px;">
								<span style="font-family: Yidstreet; font-weight: 600;">Floriography</span>
								<span style="font-family: NexonLv1Gothic; font-weight: 400;">${flower.floriography}</span>
							</div>
						</div>
	
						<!-- Size & Price -->
						<div style="
							position: absolute;
							left: 2.8em;
							top: 36.75em;
							display: flex;
							flex-direction: row;
							gap: 5rem;
							color: black;
							font-size: 1.175rem;
						">
							<div style="display: flex; gap: 0.75rem; align-items: baseline;">
								<span style="font-family: Yidstreet; font-weight: 600;">Size</span>
								<span style="font-family: NexonLv1Gothic; font-weight: 400;">${flower.bouquetSize}</span>
							</div>
							<div style="display: flex; gap: 0.75rem; align-items: baseline;">
								<span style="font-family: Yidstreet; font-weight: 600;">Price</span>
								<span style="font-family: NexonLv1Gothic; font-weight: 400;">${flower.price}원</span>
							</div>
						</div>
					</div>
				</div>
			`;

			document.body.appendChild(tempDiv);

			await new Promise((resolve) => setTimeout(resolve, 100));

			const canvas = await html2canvas(tempDiv, {
				scale: 2,
				useCORS: true,
				allowTaint: true,
				backgroundColor: null,
				width: 384,
				height: 593,
			});

			document.body.removeChild(tempDiv);

			canvas.toBlob((blob) => {
				if (blob !== null) {
					saveAs(blob, `${flower.title}.png`);
				}
			});
		} catch (error) {
			console.error("Error converting div to image:", error);
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
