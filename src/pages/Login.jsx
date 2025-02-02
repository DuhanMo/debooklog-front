// src/pages/Login.jsx

import React from 'react';
import config from '../config';

// 사용할 소셜 로그인 제공자 목록
const providers = ['GOOGLE', 'KAKAO'];

// 환경 변수에 정의된 베이스 URL을 사용하고, 없으면 기본값을 사용
const BASE_URL = config.BASE_URL

const Login = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Login</h1>
            <p>Please select a social provider to login:</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                {providers.map((provider) => (
                    <a key={provider} href={`${BASE_URL}/oauth2/code/${provider}`}>
                        <button type="button">Login with {provider}</button>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Login;
