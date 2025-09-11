export interface FlowerCard {
	// 기본 카드 정보
	date: string;
	title: string;
	flowerImg: string;
	mainFlowers: string[];
	subFlowers: string[];
	floriography: string;
	size: string;
	price: number;

	// 메시지 관련 (Phase 2, 3에서 사용)
	message?: string;
	sender?: string;
	receiver?: string;
}

export interface Friend {
	id: string;
	name: string;
	email: string;
}

// UI 상태 관리용 타입
export interface UIState {
	showSendPopup: boolean;
	showFriendsDialog: boolean;
	archiveSavedAlertVisible: boolean;
	sendCompletedAlertVisible: boolean;
}

// Phase 타입
export const ResultPhase = {
	RESULT_DISPLAY: "result_display",
	MESSAGE_WRITING: "message_writing",
} as const;

export type ResultPhase = (typeof ResultPhase)[keyof typeof ResultPhase];
