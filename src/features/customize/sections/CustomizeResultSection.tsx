import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import iconOrder from "../../../assets/generate/result/icon-order.svg";
import iconOrderHover from "../../../assets/generate/result/icon-order-hover.svg";
import iconRestart from "../../../assets/generate/result/icon-restart.svg";
import iconSave from "../../../assets/generate/result/icon-save.svg";
import iconSaveHover from "../../../assets/generate/result/icon-save-hover.svg";
import iconSend from "../../../assets/generate/result/icon-send.svg";
import iconSendHover from "../../../assets/generate/result/icon-send-hover.svg";
import type { FlowerCard, Friend, UIState } from "../../../types/FlowerCard";
import GradientIconButton from "../../../components/button/GradientIconButton";
import ResultCard from "../components/ResultCard";
import SelectFriendPopup from "../components/SelectFriendPopup";
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';
import SimpleIconButton from "../../../components/button/SimpleIconButton";

interface CustomizeResultSectionProps {
	flowerCard: FlowerCard;
	uiState: UIState;
	updateUIState: (updates: Partial<UIState>) => void;
	onFriendSelect: (friend: Friend) => void;
	mockFriends: Friend[];
}

const CustomizeResultSection: React.FC<CustomizeResultSectionProps> = ({
	flowerCard,
	uiState,
	updateUIState,
	onFriendSelect,
	mockFriends,
}) => {
	const navigate = useNavigate();
	const sendMenuRef = useRef<HTMLDivElement | null>(null);
    const divRef = useRef<HTMLDivElement | null>(null);

	const handleDownload = async () => {
        if (!divRef.current) return;

        try {
			// Front result card만을 위한 임시 div 생성
			const tempDiv = document.createElement('div');
			tempDiv.style.position = 'absolute';
			tempDiv.style.left = '-9999px';
			tempDiv.style.top = '0';
			tempDiv.style.width = '24em';
			tempDiv.style.height = '37.0625em';
			tempDiv.style.fontSize = '16px'; 
	
			// Front result card HTML 직접 생성 (3D transform 없이)
			tempDiv.innerHTML = `
				<div style="width: 24em; height: 37.0625em;">
					<div style="
						position: relative;
						width: 100%;
						height: 100%;
						border-radius: 2.5rem;
						background-image: url(/src/assets/generate/result/card.png);
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
							font-size: 0.875rem;
							font-family: Yidstreet;
						">
							${flowerCard.date}
						</div>
	
						<!-- 꽃 이미지 -->
						<div style="
							position: absolute;
							left: 45%;
							top: 13.75em;
							transform: translate(-50%, -50%);
							z-index: 10;
						">
							<img src="${flowerCard.flowerImg}" alt="flower" style="height: 20em; object-fit: contain;" />
						</div>
	
						<!-- 제목 -->
						<div style="
							position: absolute;
							left: 1.6em;
							top: 16em;
							color: black;
							z-index: 20;
							font-weight: bold;
							font-size: 1.5rem;
							font-family: Yidstreet;
						">
							${flowerCard.title}
						</div>
	
						<!-- 메인/서브 꽃 -->
						<div style="
							position: absolute;
							left: 2.8em;
							top: 31.75em;
							color: black;
							font-size: 0.875rem;
						">
							<div style="display: flex; flex-direction: row; gap: 10px; margin-bottom: 5px;">
								<span style="font-family: Yidstreet; font-weight: 600;">Main</span>
								<span style="font-family: NexonLv1Gothic; font-weight: 400;">${flowerCard.mainFlowers.join(", ")}</span>
								<span style="font-family: Yidstreet; font-weight: 600;">Sub</span>
								<span style="font-family: NexonLv1Gothic; font-weight: 400;">${flowerCard.subFlowers.join(", ")}</span>
							</div>
							<div style="display: flex; flex-direction: row; gap: 10px;">
								<span style="font-family: Yidstreet; font-weight: 600;">Floriography</span>
								<span style="font-family: NexonLv1Gothic; font-weight: 400;">${flowerCard.floriography}</span>
							</div>
						</div>
	
						<!-- Size & Price -->
						<div style="
							position: absolute;
							left: 2.8em;
							top: 37em;
							display: flex;
							flex-direction: row;
							gap: 5rem;
							color: black;
							font-size: 0.875rem;
						">
							<div style="display: flex; gap: 0.75rem; align-items: baseline;">
								<span style="font-family: Yidstreet; font-weight: 600;">Size</span>
								<span style="font-family: NexonLv1Gothic; font-weight: 400;">${flowerCard.size}</span>
							</div>
							<div style="display: flex; gap: 0.75rem; align-items: baseline;">
								<span style="font-family: Yidstreet; font-weight: 600;">Price</span>
								<span style="font-family: NexonLv1Gothic; font-weight: 400;">${flowerCard.price}원</span>
							</div>
						</div>
					</div>
				</div>
			`;
			
			document.body.appendChild(tempDiv);
			
			await new Promise(resolve => setTimeout(resolve, 100));
			
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
					saveAs(blob, `result-card.png`);
				}
			});
		} catch (error) {
			console.error("Error converting div to image:", error);
		}
	}

	// Close on outside click or Escape
	useEffect(() => {
		function onDocMouseDown(e: MouseEvent) {
			if (!sendMenuRef.current) return;
			if (!sendMenuRef.current.contains(e.target as Node)) {
				updateUIState({ showSendPopup: false });
			}
		}
		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") updateUIState({ showSendPopup: false });
		}
		if (uiState.showSendPopup) {
			document.addEventListener("mousedown", onDocMouseDown);
			document.addEventListener("keydown", onKey);
		}
		return () => {
			document.removeEventListener("mousedown", onDocMouseDown);
			document.removeEventListener("keydown", onKey);
		};
	}, [uiState.showSendPopup, updateUIState]);

	return (
		<>
			<div className={`flex flex-col items-center transition-all duration-300`}>
				{/* 제목 */}
				<h1
					className="text-3xl font-bold text-gray mb-6 z-40 mt-20"
					style={{ fontFamily: "NexonLv1Gothic" }}
				>
					디자인 결과
				</h1>

				{/* Card container to help with positioning */}
				<div className="relative inline-block">
					{/* recreate button */}
					<SimpleIconButton
						onClick={() => navigate(-1)}
						icon={iconRestart}
						label="다시 만들기"
						className="absolute left-[-6.25em] top-[0.625em]"
					/>
					<div ref={divRef}>
						<ResultCard flowerCard={flowerCard} />
					</div>
					{/* action buttons below the card */}
					<div className="mt-4 w-full flex justify-center">
						<div className="grid grid-cols-3 gap-4">
							{/* Send button with two-item popup */}
							<div
								className="relative flex items-center justify-center"
								ref={sendMenuRef}
							>
								<SimpleIconButton
									onClick={() =>
										updateUIState({ showSendPopup: !uiState.showSendPopup })
									}
									icon={iconSend}
									hoverIcon={iconSendHover}
									label="보내기"
								/>
								{uiState.showSendPopup && (
									<div
										className="absolute bottom-full mb-1 left-[4em] -translate-x-1/4 rounded-t-2xl rounded-br-2xl bg-white text-sm text-dark-gray z-50 border border-gray/40 overflow-hidden whitespace-nowrap"
										style={{ fontFamily: "NexonLv1Gothic" }}
										role="menu"
										aria-label="send options"
									>
										<button
											onClick={() => {
												updateUIState({
													showSendPopup: false,
													showFriendsDialog: true,
												});
											}}
											className="block w-full text-center text-base py-5 px-8 hover:bg-gray/20"
											style={{ fontFamily: "NexonLv1Gothic" }}
											role="menuitem"
										>
											친구에게 보내기
										</button>
										<button
											onClick={() => {
												updateUIState({
													showSendPopup: false,
													archiveSavedAlertVisible: true,
												});
											}}
											className="block w-full text-center text-base py-5 px-8 hover:bg-gray/20 border-t border-gray/40"
											style={{ fontFamily: "NexonLv1Gothic" }}
											role="menuitem"
										>
											나에게 보내기
										</button>
									</div>
								)}
							</div>
							<GradientIconButton
								onClick={() => navigate(-1)}
								icon={iconOrder}
								hoverIcon={iconOrderHover}
								label="실물 보내기"
							/>
							<SimpleIconButton
								onClick={handleDownload}
								icon={iconSave}
								hoverIcon={iconSaveHover}
								label="저장하기"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Friends Selection Dialog */}
			{uiState.showFriendsDialog && (
				<div className="fixed inset-0 flex items-center justify-center z-50">
					<SelectFriendPopup
						mockFriends={mockFriends}
						onFriendSelect={onFriendSelect}
						updateUIState={updateUIState}
					/>
				</div>
			)}
		</>
	);
};

export default CustomizeResultSection;
