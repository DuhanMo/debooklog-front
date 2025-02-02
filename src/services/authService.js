import apiClient from '../api/apiClient';

const login = async (code, provider) => {
    // POST /oauth2/login 요청, body는 { code, provider }
    const response = await apiClient.post('/oauth2/login', { code, provider });
    // 서버 응답: { accessToken: string, refreshToken: string }
    return response.data;
};

export default {
    login,
};
