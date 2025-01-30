import axios from "axios";
import { getAccessToken, removeAccessToken } from "./localStorage";
import CONFIG from "../config";

const apiClient = axios.create({
    baseURL: CONFIG.API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

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

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            removeAccessToken(); // ✅ 토큰 삭제

            const currentPath = window.location.pathname; // ✅ 현재 페이지 URL 저장
            sessionStorage.setItem("redirectAfterLogin", currentPath);

            window.location.href = "/login"; // ✅ 로그인 페이지로 이동
        }
        return Promise.reject(error);
    }
);

export default apiClient;
