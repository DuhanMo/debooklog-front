import axiosInstance from "./axiosInstance";

interface OAuth2LoginRequest {
    provider: "GOOGLE" | "KAKAO" | "GITHUB";
    code: string;
}

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

/**
 * OAuth 인증 코드로 로그인하여 액세스 토큰을 받아오는 API 요청
 */
export const loginByAuthCode = async (data: OAuth2LoginRequest): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>("/oauth2/login", data);
    return response.data;
};

/**
 * OAuth 제공자의 인증 페이지로 이동하는 URL 생성
 */
export const getAuthRedirectUrl = (provider: OAuth2LoginRequest["provider"], state?: string): string => {
    const baseUrl = `http://localhost:8080/oauth2/code/${provider}`;
    return state ? `${baseUrl}?state=${encodeURIComponent(state)}` : baseUrl;
};

export default {
    loginByAuthCode,
    getAuthRedirectUrl,
};
