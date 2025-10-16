import { cardAPI } from "../../../api";
import type { FlowerCard } from "../../../types/FlowerCard";

export interface CreateCardParams {
    answers: Record<number, string[]>;
    bouquetTitle: string;
}

export interface CardData {
    mainFlowerId: number;
    title: string;
    whoType: string;
    whenType: string;
    emotionTypes: string[];
    bouquetSize: string;
    wrappingType: string;
    price: number;
}

export interface CreateCardFromDataParams {
    cardData: CardData;
}

const sizeToPrice = (size?: string) => {
    switch ((size || "").toLowerCase()) {
        case "s":
            return 10000;
        case "m":
            return 25000;
        case "l":
            return 50000;
        default:
            return 25000;
    }
};

const formatDate = (d: Date) =>
    `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
        d.getDate(),
    ).padStart(2, "0")}`;

/**
 * 질문 답변을 기반으로 카드를 생성합니다.
 */
export const createCardFromAnswers = async ({ 
    answers, 
    bouquetTitle 
}: CreateCardParams): Promise<{ flowerCard: FlowerCard; cardData: CardData } | undefined> => {
    try {
        // 유저 id
        // const me = await authAPI.me();
        // const userId: string = me.userId ?? me.id ?? "";

        // 각 질문별 값 추출
        const q1 = answers[1]?.[0]; // whoType
        const q2 = answers[2]?.[0]; // whenType
        const q3 = answers[3] || []; // emotionTypes
        const q4 = answers[4]?.[0]; // mainFlowerId (id 문자열 가정)
        const q5 = answers[5]?.[0]; // bouquetSize S|M|L
        const q6 = answers[6]?.[0]; // wrappingType

        const cardData: CardData = {
            mainFlowerId: Number(q4) || 0,
            title: bouquetTitle || "꽃다발",
            whoType: q1 || "",
            whenType: q2 || "",
            emotionTypes: q3 as string[],
            bouquetSize: q5 || "",
            wrappingType: q6 || "",
            price: sizeToPrice(q5),
        };

        const res = await cardAPI.createCard(cardData);

        // 결과 페이지에 전달할 FlowerCard 구성
        const senderName = localStorage.getItem("name") || "";
        const today = new Date();

        const flowerCard: FlowerCard = {
            id: String(res.cardId),
            date: formatDate(today),
            title: res.title,
            flowerImg: res.imageUrl,
            mainFlowers: [res.mainFlower?.koreanName || ""],
            subFlowers: [res.subFlower?.koreanName || ""],
            floriography: res.floriography || "",
            size: res.bouquetSize,
            price: res.price,
            sender: senderName || undefined,
        };

        return { flowerCard, cardData };
    } catch (e) {
        console.error("createCard error", e);
        return undefined;
    }
};

/**
 * 기존 카드 데이터를 기반으로 새로운 카드를 생성합니다.
 */
export const createCardFromData = async ({ 
    cardData 
}: CreateCardFromDataParams): Promise<FlowerCard | undefined> => {
    try {
        const res = await cardAPI.createCard(cardData);

        // 결과 페이지에 전달할 FlowerCard 구성
        const senderName = localStorage.getItem("name") || "";
        const today = new Date();

        const flowerCard: FlowerCard = {
            id: String(res.cardId),
            date: formatDate(today),
            title: res.title,
            flowerImg: res.imageUrl,
            mainFlowers: [res.mainFlower?.koreanName || ""],
            subFlowers: [res.subFlower?.koreanName || ""],
            floriography: res.floriography || "",
            size: res.bouquetSize,
            price: res.price,
            sender: senderName || undefined,
        };

        return flowerCard;
    } catch (e) {
        console.error("createCard error", e);
        return undefined;
    }
};
