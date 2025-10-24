import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cardAPI } from "../../api";
import { friendAPI } from "../../api";
import bg from "../../assets/generate/result/bg.png";
import AlertDialog from "../../components/dialog/AlertDialog";
import ConfirmDialog from "../../components/dialog/ConfirmDialog";
import LoadingPage from "../../components/LoadingPage";
import CustomizeResultSection from "../../features/customize/sections/CustomizeResultSection";
import MessageSection from "../../features/customize/sections/MessageSection";
import type { CardData } from "../../features/customize/api/cardCreation";
import { createCardFromData } from "../../features/customize/api/cardCreation";
import type {
	FlowerCard,
	Friend,
	ResultPhase,
	UIState,
} from "../../types/FlowerCard";
import { ResultPhase as ResultPhaseConst } from "../../types/FlowerCard";

// 초기 FlowerCard 데이터
const initialFlowerCard: FlowerCard = {
	cardId: 0,
	title: "TITLE 꽃다발",
	imageUrl: "/src/assets/generate/result/temp-flower.png",
	imageSource: "",
	floriography: "새로운 시작을 응원합니다",
	whoType: "",
	whoLabel: "",
	whenType: "",
	whenLabel: "",
	emotionTypes: [],
	emotionLabels: [],
	bouquetSize: "M",
	bouquetLabel: "M",
	wrappingType: "",
	wrappingLabel: "",
	price: 30000,
	designAssetId: 1,
	backgroundColors: ["#FFE5E5", "#FFF0F0"],
	mainFlower: {
		flowerId: 1,
		koreanName: "프리지아",
		englishName: "Freesia",
		imageUrl: "",
	},
	subFlower: {
		flowerId: 2,
		koreanName: "개나리",
		englishName: "Forsythia",
		imageUrl: "",
	},
	sender: "seollhii",
};

const CustomizingResultPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // location.state에 전달된 카드와 cardData가 있으면 우선 사용
    const locationState = location.state as { flowerCard?: FlowerCard; cardData?: CardData } | undefined;
    const stateFlowerCard = locationState?.flowerCard;
    const stateCardData = locationState?.cardData;
    const [flowerCard, setFlowerCard] = useState<FlowerCard>(stateFlowerCard || initialFlowerCard);
    
    // cardData가 없으면 기본값 생성 (초기 FlowerCard 기반)
    const defaultCardData: CardData = {
        mainFlowerId: 1,
        title: initialFlowerCard.title,
        whoType: "",
        whenType: "",
        emotionTypes: [],
        bouquetSize: initialFlowerCard.bouquetSize,
        wrappingType: "",
        price: initialFlowerCard.price,
    };
    const [cardData] = useState<CardData>(stateCardData || defaultCardData);
	const [currentPhase, setCurrentPhase] = useState<ResultPhase>(
		ResultPhaseConst.RESULT_DISPLAY,
	);
	const [uiState, setUiState] = useState<UIState>({
		showSendPopup: false,
		showFriendsDialog: false,
		archiveSavedAlertVisible: false,
		sendCompletedAlertVisible: false,
	});
    const [friends, setFriends] = useState<Friend[]>([]);
    const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
    const [isRecreating, setIsRecreating] = useState(false);

    // 친구 목록 가져오기
	const getFriends = async () => {
		try {
			const response = await friendAPI.getFriends();
			const friendsData = response.items.map(
				(item: {
					userId: string;
					firstName: string;
					lastName: string;
					email: string;
				}) => ({
					id: item.userId,
					name: `${item.lastName}${item.firstName}`.trim(),
					email: item.email,
				}),
			);
			setFriends(friendsData);
		} catch (error) {
			console.error("친구 목록 가져오기 실패:", error);
		}
	};

    // 컴포넌트 마운트 시: 친구 목록과 location.state의 카드 반영
    useEffect(() => {
        getFriends();
        if (stateFlowerCard) {
            setFlowerCard(stateFlowerCard);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        setSelectedFriend(friend);
        updateFlowerCard({ receiver: friend.name, sender: localStorage.getItem("name") || "" });
        updateUIState({ showFriendsDialog: false });
        setCurrentPhase(ResultPhaseConst.MESSAGE_WRITING);
    };

    const handleSendMessage = async () => {
        if (
            flowerCard.message?.trim() &&
            (flowerCard.sender?.trim() || localStorage.getItem("name")) &&
            selectedFriend
        ) {
            try {
                await cardAPI.sendCardToFriend(
                    String(flowerCard.cardId),
                    selectedFriend.id,
                    selectedFriend.name,
                    localStorage.getItem("name") || flowerCard.sender || "",
                    flowerCard.message || "",
                );
            } catch (e) {
                console.error("sendCardToFriend error", e);
            }
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

	const handleRecreate = async (cardDataToRecreate: CardData) => {
		try {
			setIsRecreating(true);
			const [newFlowerCard] = await Promise.all([
				createCardFromData({ cardData: cardDataToRecreate }),
				new Promise(resolve => setTimeout(resolve, 2500)) // 2.5초 대기
			]);
			setIsRecreating(false);
			
			if (newFlowerCard) {
				navigate("/customizing/result", { 
					state: { 
						flowerCard: newFlowerCard,
						cardData: cardDataToRecreate 
					},
					replace: true 
				});
			}
		} catch (error) {
			console.error("Recreate card error:", error);
			setIsRecreating(false);
		}
	};

	const renderPhaseContent = () => {
		switch (currentPhase) {
			case ResultPhaseConst.RESULT_DISPLAY:
				return (
					<CustomizeResultSection
						flowerCard={flowerCard}
						cardData={cardData}
						uiState={uiState}
						updateUIState={updateUIState}
						onFriendSelect={handleFriendSelect}
						friends={friends}
						onRecreate={handleRecreate}
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
						cardData={cardData}
						uiState={uiState}
						updateUIState={updateUIState}
						onFriendSelect={handleFriendSelect}
						friends={friends}
						onRecreate={handleRecreate}
					/>
				);
		}
	};

	// 재생성 중일 때 로딩 페이지 표시
	if (isRecreating) {
		return <LoadingPage message="꽃다발 다시 만드는 중" />;
	}

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
