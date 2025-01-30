import { authApi } from "../api";
import { getAccessToken, setAccessToken, removeAccessToken } from "../utils/localStorage";

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
