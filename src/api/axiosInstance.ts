import axios from "axios";

// Axios 기본 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

// 요청 인터셉터 (예: JWT 토큰 자동 추가)
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken"); // 로컬 스토리지에서 토큰 가져오기
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터 (예: 토큰 만료 시 로그아웃 처리)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("accessToken");
            window.location.href = "/login"; // 인증 만료 시 로그인 페이지로 이동
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
