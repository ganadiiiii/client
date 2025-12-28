import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/generate/result/bg.png";
import AlertDialog from "../../components/dialog/AlertDialog";
import ConfirmDialog from "../../components/dialog/ConfirmDialog";
import LoadingPage from "../../components/LoadingPage";
import CustomizeResultSection from "../../features/customize/sections/CustomizeResultSection";
import MessageSection from "../../features/customize/sections/MessageSection";
import { demoCards } from "../../demo/const";
import type {
	FlowerCard,
	Friend,
	ResultPhase,
	UIState,
} from "../../types/FlowerCard";
import { ResultPhase as ResultPhaseConst } from "../../types/FlowerCard";

// 데모용 고정 카드 (데모 카드 1번)
const demoFlowerCard: FlowerCard = demoCards[0] || {
    cardId: 1,
    title: "축하의 마음을 전해요",
    imageUrl: "/assets/demo/flowers/flower1.png",
    imageSource: "custom",
    floriography: "사랑과 감사의 마음을 담아",
    whoType: "myself",
    whoLabel: "친구",
    whenType: "birthday",
    whenLabel: "생일",
    emotionTypes: ["joy", "love"],
    emotionLabels: ["기쁨", "사랑"],
    bouquetSize: "medium",
    bouquetLabel: "중간",
    wrappingType: "ribbon",
    wrappingLabel: "리본",
    price: 35000,
    designAssetId: 1,
    backgroundColors: ["#F4B086", "#FBD3B1", "#F0816F", "#F0816F"],
    mainFlower: {
        flowerId: 1,
        koreanName: "장미",
        englishName: "Rose",
        imageUrl: "/assets/demo/flowers/flower1.png",
    },
    subFlower: {
        flowerId: 2,
        koreanName: "카네이션",
        englishName: "Carnation",
        imageUrl: "/assets/demo/flowers/flower2.png",
    },
};

const CustomizingResultPage: React.FC = () => {
    console.log("CustomizingResultPage 컴포넌트 렌더링 시작");
    const navigate = useNavigate();
    
    // 데모용 고정 카드 사용
    const [flowerCard, setFlowerCard] = useState<FlowerCard>(demoFlowerCard);
    
    // 데모용 고정 cardData
    const demoCardData = {
        mainFlowerId: 1,
        title: demoFlowerCard.title,
        whoType: demoFlowerCard.whoType,
        whenType: demoFlowerCard.whenType,
        emotionTypes: demoFlowerCard.emotionTypes,
        bouquetSize: demoFlowerCard.bouquetSize,
        wrappingType: demoFlowerCard.wrappingType,
        price: demoFlowerCard.price,
    };
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

    // 컴포넌트 마운트 시: 로딩 delay 후 데모 데이터 설정
    useEffect(() => {
        const loadDemo = async () => {
            console.log("로딩 시작...");
            // 2초 로딩 delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // 데모용 친구 목록
            const demoFriends: Friend[] = [
                { id: "1", name: "김친구", email: "friend1@example.com" },
                { id: "2", name: "이친구", email: "friend2@example.com" },
                { id: "3", name: "박친구", email: "friend3@example.com" },
            ];
            
            console.log("로딩 완료, 친구 목록 설정:", demoFriends);
            setFriends(demoFriends);	
        };
        loadDemo();
    }, []);

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
            // 데모용: API 호출 없이 바로 성공 처리
            console.log("데모: 메시지 전송 시뮬레이션");
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

	const handleRecreate = async () => {
		try {
			setIsRecreating(true);
			// 2.5초 로딩 후 같은 데모 카드로 새로고침
			await new Promise(resolve => setTimeout(resolve, 2500));
			setIsRecreating(false);
			
			// 페이지 새로고침 효과
			navigate("/customizing/result", { replace: true });
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
						cardData={demoCardData}
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
						cardData={demoCardData}
						uiState={uiState}
						updateUIState={updateUIState}
						onFriendSelect={handleFriendSelect}
						friends={friends}
						onRecreate={handleRecreate}
					/>
				);
		}
	};

	if (isRecreating) {
		return <LoadingPage message="꽃다발 다시 만드는 중" />;
	}

	console.log("메인 컨텐츠 렌더링, currentPhase:", currentPhase);

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
