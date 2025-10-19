export interface Flower {
	flowerId: number;
	koreanName: string;
	englishName: string;
	imageUrl: string;
}

export interface FlowerCard {
	// API 응답 필드
	cardId: number;
	title: string;
	imageUrl: string;
	imageSource: string;
	floriography: string;
	whoType: string;
	whoLabel: string;
	whenType: string;
	whenLabel: string;
	emotionTypes: string[];
	emotionLabels: string[];
	bouquetSize: string;
	bouquetLabel: string;
	wrappingType: string;
	wrappingLabel: string;
	price: number;
	designAssetId: number;
	backgroundColors: string[];
	mainFlower: Flower;
	subFlower: Flower;

	// 메시지 관련 (Phase 2, 3에서 사용)
	message?: string;
	sender?: string;
	receiver?: string;
}

export interface CardsResponse {
	cards: FlowerCard[];
	page: number;
	size: number;
	totalElements: number;
	totalPages: number;
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
