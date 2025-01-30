const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

/**
 * 액세스 토큰 저장
 * @param {string} token - 저장할 액세스 토큰
 */
export const setAccessToken = (token) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

/**
 * 액세스 토큰 가져오기
 * @returns {string | null} - 저장된 액세스 토큰 (없으면 null 반환)
 */
export const getAccessToken = () => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
};

/**
 * 액세스 토큰 삭제 (로그아웃 시 사용)
 */
export const removeAccessToken = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
};

/**
 * 리프레시 토큰 저장
 * @param {string} token - 저장할 리프레시 토큰
 */
export const setRefreshToken = (token) => {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

/**
 * 리프레시 토큰 가져오기
 * @returns {string | null} - 저장된 리프레시 토큰 (없으면 null 반환)
 */
export const getRefreshToken = () => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * 리프레시 토큰 삭제
 */
export const removeRefreshToken = () => {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
};

/**
 * 로그아웃 처리 (토큰 삭제)
 */
export const clearAuthTokens = () => {
    removeAccessToken();
    removeRefreshToken();
};
