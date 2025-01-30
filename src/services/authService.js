import { authApi } from "../api";
import { getAccessToken, setAccessToken, removeAccessToken } from "../utils/localStorage";
import {fetchOAuth2LoginUrl} from "../api/auth";


/**
 * 소셜 로그인 URL 가져오기 (클라이언트 -> 서버 -> 소셜 로그인 페이지 리다이렉트)
 * @param {string} provider - "GOOGLE", "KAKAO", "GITHUB"
 */
export const getOAuth2LoginUrl = (provider) => {
    return fetchOAuth2LoginUrl(provider);
};

/**
 * OAuth2 로그인 처리
 * @param {string} code - OAuth2 인증 코드
 * @param {string} provider - "GOOGLE", "KAKAO", "GITHUB"
 * @returns {Promise<void>}
 */
export const login = async (code, provider) => {
    try {
        const { accessToken, refreshToken } = await authApi.loginWithOAuth2(code, provider);
        setAccessToken(accessToken);
    } catch (error) {
        console.error("로그인 실패:", error);
        throw error;
    }
};

/**
 * 로그아웃 처리
 */
export const logout = () => {
    removeAccessToken();
};

/**
 * 현재 사용자 인증 상태 확인
 * @returns {boolean} - 로그인 상태 여부
 */
export const isAuthenticated = () => {
    return !!getAccessToken();
};
