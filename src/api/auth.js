import apiClient from "../utils/apiClient";
import CONFIG from "../config";

const API_BASE_URL = CONFIG.API_BASE_URL;

/**
 * 소셜 로그인 URL 가져오기 (클라이언트 -> 서버 -> 소셜 로그인 페이지 리다이렉트)
 * @param {string} provider - "GOOGLE", "KAKAO", "GITHUB"
 */
export const fetchOAuth2LoginUrl = (provider) => {
    return `${API_BASE_URL}/oauth2/code/${provider}`;
};

/**
 * 로그인 API (OAuth2 콜백 URL에서 받은 코드와 provider를 사용)
 * @param {string} code - OAuth2 인증 코드
 * @param {string} provider - "GOOGLE", "KAKAO", "GITHUB"
 * @returns {Promise<{ accessToken: string, refreshToken: string }>}
 */
export const loginWithOAuth2 = async (code, provider) => {
    try {
        const response = await apiClient.post("/oauth2/login", { code, provider });
        return response.data;
    } catch (error) {
        console.error("OAuth2 로그인 실패:", error);
        throw error;
    }
};