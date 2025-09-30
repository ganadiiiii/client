import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const cardAPI = {
    // 카드 목록 API
    getCards: async () => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(`${API_BASE_URL}/archive`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        return response.data;
    },
};