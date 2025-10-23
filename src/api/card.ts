import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const cardAPI = {
	// 카드 목록 API
	getCards: async () => {
		const accessToken = localStorage.getItem("accessToken");
		const response = await axios.get(`${API_BASE_URL}/archive`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
		});
		return response.data;
	},

    // 카드 생성 API
    createCard: async (
        cardData: {
            mainFlowerId: number;
            title: string;
            whoType: string;
            whenType: string;
            emotionTypes: string[];
            bouquetSize: string;
            wrappingType: string;
            price: number;
        },
        // userId: string,
    ) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(`${API_BASE_URL}/cards`, cardData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
                // "X-User-Id": userId,
            },
        });
        return response.data;
    },

	// 나에게 보내기 API
	sendCardToMyself: async (cardId: string) => {
		const accessToken = localStorage.getItem("accessToken");
		const response = await axios.post(`${API_BASE_URL}/cards/${cardId}/send/self`, {}, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
		});
		return response.data;
	},

	// 친구에게 보내기 API
	sendCardToFriend: async (
		cardId: string,
		receiverId: string,
		toName: string,
		fromName: string,
		note: string
	) => {
		const accessToken = localStorage.getItem("accessToken");
		const response = await axios.post(
			`${API_BASE_URL}/cards/${cardId}/send`,
			{
				receiverId,
				toName,
				fromName,
				note
			},
			{
				headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
				},
			}
		);
		return response.data;
	},

	// 만든 카드 모두 조회 API
	getAllCards: async (page = 0, size = 15) => {
		const accessToken = localStorage.getItem("accessToken");
		const response = await axios.get(`${API_BASE_URL}/archive`, {
			params: { page, size },
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
		});
		return response.data;
	},

	// 카드 상세 조회 API
	getCardDetail: async (cardId: string) => {
		const accessToken = localStorage.getItem("accessToken");
		const response = await axios.get(`${API_BASE_URL}/cards/${cardId}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
		});
		return response.data;
	},

	// 받은 카드만 조회 API
	// getReceivedCards: async () => {
	// 	const accessToken = localStorage.getItem("accessToken");
	// 	const response = await axios.get(`${API_BASE_URL}/archive`, {
	// 		headers: {
	// 			Authorization: `Bearer ${accessToken}`,
	// 			"Content-Type": "application/json",
	// 		},
	// 	});
	// 	return response.data;
	// },

	// 카드 삭제 API
	deleteCard: async (cardId: string) => {
		const accessToken = localStorage.getItem("accessToken");
		const response = await axios.delete(`${API_BASE_URL}/cards/${cardId}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
		});
		return response.data;
	},
};
