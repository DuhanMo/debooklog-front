/**
 * 날짜를 YYYY-MM-DD 형식으로 변환
 */
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // "YYYY-MM-DD" 형식
};

/**
 * 긴 텍스트를 지정된 길이만큼 자르고 "..."을 추가
 */
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
};

/**
 * OAuth 로그인 리디렉션 URL 생성
 */
export const getOAuthRedirectUrl = (provider: "GOOGLE" | "KAKAO" | "GITHUB", state?: string): string => {
    const baseUrl = `http://localhost:8080/oauth2/code/${provider}`;
    return state ? `${baseUrl}?state=${encodeURIComponent(state)}` : baseUrl;
};
