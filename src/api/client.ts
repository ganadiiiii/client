import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
	baseURL: API_BASE_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

// 요청 인터셉터 - 토큰 자동 추가
apiClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// 응답 인터셉터 - 토큰 만료 시 refresh
apiClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			const refreshToken = localStorage.getItem("refreshToken");
			if (refreshToken) {
				try {
					const plainAxios = axios.create();
					const { data } = await plainAxios.post(
						`${API_BASE_URL}/auth/refresh`,
						{
							refreshToken,
						},
					);

					const { accessToken } = data;
					localStorage.setItem("accessToken", accessToken);

					originalRequest.headers.Authorization = `Bearer ${accessToken}`;
					return apiClient(originalRequest);
				} catch (reissueError) {
					console.error("토큰 재발급 실패:", reissueError);
					localStorage.clear();
					window.location.href = "/login";
					return Promise.reject(reissueError);
				}
			} else {
				window.location.href = "/login";
			}
			return Promise.reject(error);
		}
	},
);
