import axios from "axios";
import { getAccessToken, removeAccessToken } from "./localStorage";

const API_BASE_URL = "http://debooklog.ap-northeast-2.elasticbeanstalk.com";

/**
 * Axios 인스턴스 생성
 */
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * 요청 인터셉터: 인증 토큰 자동 추가
 */
apiClient.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

/**
 * 응답 인터셉터: 401 에러 처리 (로그아웃)
 */
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            removeAccessToken();
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default apiClient;
