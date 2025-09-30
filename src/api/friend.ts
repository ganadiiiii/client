import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const friendAPI = {
	// 검색 API
	search: async (searchTerm: string = "") => {
		const accessToken = localStorage.getItem("accessToken");
		const response = await axios.get(`${API_BASE_URL}/users/search`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			params: searchTerm ? { query: searchTerm } : {},
		});
		return response.data;
	},

	// 친구 목록 API
	getFriends: async () => {
		const accessToken = localStorage.getItem("accessToken");
		const response = await axios.get(`${API_BASE_URL}/friends`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
		});
		return response.data;
	},

	// 친구 요청 목록 API
	getFriendsRequest: async () => {
		const accessToken = localStorage.getItem("accessToken");
		const response = await axios.get(`${API_BASE_URL}/friends/requests`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
		});
		return response.data;
	},

	// 친구 삭제 API
	deleteFriend: async (friendId: string) => {
		const accessToken = localStorage.getItem("accessToken");
		const response = await axios.delete(`${API_BASE_URL}/friends/${friendId}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
		});
		return response.data;
	},

	// 친구 요청 API
	sendFriendRequest: async (receiverId: string) => {
		const accessToken = localStorage.getItem("accessToken");
		const response = await axios.post(`${API_BASE_URL}/friends/requests`, {
			receiverId,
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
		});
		return response.data;
	},

	// 친구 요청 거절 API
	rejectFriendRequest: async (requestId: number) => {
		const accessToken = localStorage.getItem("accessToken");
		const response = await axios.post(
			`${API_BASE_URL}/friends/requests/${requestId}/reject`,
			{},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json",
				},
			},
		);
		return response.data;
	},

	// 친구 요청 수락 API
	acceptFriendRequest: async (requestId: number) => {
		const accessToken = localStorage.getItem("accessToken");
		const response = await axios.post(
			`${API_BASE_URL}/friends/requests/${requestId}/accept`,
			{},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json",
				},
			},
		);
		return response.data;
	},

	// 친구 요청 여부 API
	newFriend: async () => {
		const accessToken = localStorage.getItem("accessToken");
		const response = await axios.get(`${API_BASE_URL}/archive/meta`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
		});
		return response.data;
	},
};
