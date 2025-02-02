import axios from "axios";
import CONFIG from "../config";

const baseUrl = CONFIG.BASE_URL

const apiClient = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

// 요청 인터셉터: 저장된 accessToken이 있을 경우 헤더에 첨부
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 에러가 발생하면 로그인 페이지로 리다이렉트
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // 토큰이 만료되었거나 없을 경우 처리
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            // 필요 시 사용자에게 세션 만료 알림 추가 가능
            window.location.href = '/login'; // 로그인 페이지로 이동
        }
        return Promise.reject(error);
    }
);



export default apiClient;