import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/generate/result/bg.png";
import AlertDialog from "../../components/AlertDialog";
import CustomizeResultSection from "../../features/customize/sections/CustomizeResultSection";
import MessageSection from "../../features/customize/sections/MessageSection";
import type {
	FlowerCard,
	Friend,
	UIState,
	ResultPhase,
} from "../../types/FlowerCard";
import { ResultPhase as ResultPhaseConst } from "../../types/FlowerCard";
import ConfirmDialog from "../../components/ConfirmDialog";

// Mock friends data - replace with actual data source later
const mockFriends: Friend[] = [
	{ id: "1", name: "김민진", email: "minjin@gmail.com" },
	{ id: "2", name: "황종훈", email: "jonghun@gmail.com" },
	{ id: "3", name: "김혜란", email: "hyeran@gmail.com" },
	{ id: "4", name: "문정환", email: "junghwan@gmail.com" },
	{ id: "5", name: "김정원", email: "jeongwon@gmail.com" },
	{ id: "6", name: "가나디", email: "ganadii@gmail.com" },
	{ id: "7", name: "가나디", email: "ganadii@gmail.com" },
	{ id: "8", name: "가나디", email: "ganadii@gmail.com" },
	{ id: "9", name: "가나디", email: "ganadii@gmail.com" },
	{ id: "10", name: "가나디", email: "ganadii@gmail.com" },
];

// 초기 FlowerCard 데이터
const initialFlowerCard: FlowerCard = {
	date: "2025.08.14",
	title: "TITLE 꽃다발",
	flowerImg: "/src/assets/generate/result/temp-flower.png",
	mainFlowers: ["프리지아"],
	subFlowers: ["개나리", "해바라기"],
	floriography: "새로운 시작을 응원합니다",
	size: "M",
	price: 30000,
	sender: "seollhii",
};

const CustomizingResultPage: React.FC = () => {
	const navigate = useNavigate();

	// 통합된 상태 관리 - 3개로 축소!
	const [flowerCard, setFlowerCard] = useState<FlowerCard>(initialFlowerCard);
	const [currentPhase, setCurrentPhase] = useState<ResultPhase>(
		ResultPhaseConst.RESULT_DISPLAY,
	);
	const [uiState, setUiState] = useState<UIState>({
		showSendPopup: false,
		showFriendsDialog: false,
		archiveSavedAlertVisible: false,
		sendCompletedAlertVisible: false,
	});

	// 선택된 친구 상태 (UI와 분리)
	// const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

	// UI 상태 업데이트 헬퍼 함수
	const updateUIState = (updates: Partial<UIState>) => {
		setUiState((prev) => ({ ...prev, ...updates }));
	};

	// FlowerCard 업데이트 헬퍼 함수
	const updateFlowerCard = (updates: Partial<FlowerCard>) => {
		setFlowerCard((prev) => ({ ...prev, ...updates }));
	};

	// Handler functions for phase transitions
	const handleFriendSelect = (friend: Friend) => {
		// setSelectedFriend(friend);
		updateFlowerCard({ receiver: friend.name });
		updateUIState({ showFriendsDialog: false });
		setCurrentPhase(ResultPhaseConst.MESSAGE_WRITING);
	};

	const handleSendMessage = () => {
		if (flowerCard.message?.trim() && flowerCard.sender?.trim()) {
			// Navigate to the sent result page with flower card data
			updateUIState({ sendCompletedAlertVisible: true });
			setTimeout(() => {
				navigate("/customizing/result/sent", {
					state: { flowerCard },
				});
			}, 1800);
		}
	};

	const handleBack = () => {
		if (currentPhase === ResultPhaseConst.MESSAGE_WRITING) {
			setCurrentPhase(ResultPhaseConst.RESULT_DISPLAY);
			// setSelectedFriend(null);
			updateFlowerCard({ receiver: undefined });
		}
	};

	const handleMessageChange = (message: string) => {
		updateFlowerCard({ message });
	};

	const renderPhaseContent = () => {
		switch (currentPhase) {
			case ResultPhaseConst.RESULT_DISPLAY:
				return (
					<CustomizeResultSection
						flowerCard={flowerCard}
						uiState={uiState}
						updateUIState={updateUIState}
						onFriendSelect={handleFriendSelect}
						mockFriends={mockFriends}
					/>
				);
			case ResultPhaseConst.MESSAGE_WRITING:
				return (
					<MessageSection
						flowerCard={flowerCard}
						onMessageChange={handleMessageChange}
						onBack={handleBack}
						onSend={handleSendMessage}
					/>
				);
			default:
				return (
					<CustomizeResultSection
						flowerCard={flowerCard}
						uiState={uiState}
						updateUIState={updateUIState}
						onFriendSelect={handleFriendSelect}
						mockFriends={mockFriends}
					/>
				);
		}
	};

	return (
		<div
			className="relative w-screen min-h-screen flex flex-col items-center justify-center bg-[#FCFBF6] bg-cover bg-center bg-no-repeat"
			style={{
				backgroundImage: `url(${bg})`,
			}}
		>
			{/* 메인 컨텐츠 */}
			{renderPhaseContent()}

			{/* 1초 동안 표시되는 다이얼로그 */}
			<ConfirmDialog
				text="아카이빙에 저장됐어요"
				isVisible={uiState.archiveSavedAlertVisible}
				onClose={() => updateUIState({ archiveSavedAlertVisible: false })}
				onConfirm={() => navigate("/archive")}
				confirmText="아카이빙으로"
				cancelText="닫기"
			/>
			<AlertDialog
				text="전송이 완료됐어요"
				duration={1600}
				isVisible={uiState.sendCompletedAlertVisible}
				onClose={() => updateUIState({ archiveSavedAlertVisible: false })}
			/>
		</div>
	);
};

export default CustomizingResultPage;
