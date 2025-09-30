import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const authAPI = {
	// 로그인 API
	login: async (email: string, password: string) => {
		const response = await axios.post(`${API_BASE_URL}/auth/login`, {
			email,
			password,
		});
		return response.data;
	},

	// 로그아웃 API
	//   logout: async () => {
	//     const accessToken = localStorage.getItem("accessToken");
	//     const response = await axios.post(
	//       `${API_BASE_URL}/auth/logout`,
	//       {},
	//       {
	//         headers: {
	//           Authorization: `Bearer ${accessToken}`,
	//           'Content-Type': "application/json",
	//         },
	//       }
	//     );
	//     return response.data;
	//   },

	// 회원가입 API
	signup: async (userData: {
		firstName: string;
		lastName: string;
		email: string;
		password: string;
	}) => {
		const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
		return response.data;
	},

	// 유저 정보 API
	me: async () => {
		const accessToken = localStorage.getItem("accessToken");
		const response = await axios.get(`${API_BASE_URL}/users/me`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		return response.data;
	},
};
