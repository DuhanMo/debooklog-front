import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const OAuth2Redirect = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const code = searchParams.get('code');
        const provider = searchParams.get('provider');
        // state 등 추가 파라미터가 필요하면 추출 가능

        if (code && provider) {
            authService.login(code, provider)
                .then(data => {
                    // 서버로부터 accessToken과 refreshToken을 받아 저장
                    localStorage.setItem('accessToken', data.accessToken);
                    localStorage.setItem('refreshToken', data.refreshToken);
                    // 로그인 성공 시 홈 화면으로 이동
                    navigate('/');
                })
                .catch(error => {
                    console.error('Login failed:', error);
                    // 필요 시 에러 메시지 표시 또는 로그인 실패 페이지로 이동 처리
                });
        }
    }, [searchParams, navigate]);

    return <p>Logging in...</p>;
};

export default OAuth2Redirect;
