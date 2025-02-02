/**
 * 로컬 스토리지에 저장된 accessToken에서 회원 식별자(subject)를 추출하는 함수.
 * 실제 서비스에서는 보다 안정적인 JWT 파싱 라이브러리를 사용하는 것을 권장합니다.
 *
 * @returns {number|null} 로그인한 회원의 식별자(숫자) 또는 토큰이 없거나 파싱에 실패한 경우 null
 */
export const getLoggedInMemberId = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        return Number(payload.sub);
    } catch (error) {
        console.error('Token parsing error:', error);
        return null;
    }
};
