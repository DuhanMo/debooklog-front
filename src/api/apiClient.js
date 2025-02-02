import axios from "axios";
import CONFIG from "../config";

const baseUrl = CONFIG.API_BASE_URL

const apiClient = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

// 필요에 따라 요청/응답 인터셉터 추가 가능
// apiClient.interceptors.request.use((config) => {
//   // 예: 토큰 추가
//   const token = localStorage.getItem('accessToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default apiClient;