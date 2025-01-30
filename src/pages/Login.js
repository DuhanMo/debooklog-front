import React from "react";
import { getOAuth2LoginUrl } from "../services/authService";


/**
 * 로그인 페이지 컴포넌트
 * @returns {JSX.Element}
 */
const Login = () => {
    /**
     * 소셜 로그인 요청 핸들러
     * @param {string} provider - "GOOGLE", "KAKAO", "GITHUB"
     */
    const handleLogin = (provider) => {
        window.location.href = getOAuth2LoginUrl(provider);
    };

    return (
        <div>
            <h1>로그인</h1>
            <button onClick={() => handleLogin("GOOGLE")}>Google 로그인</button>
            <button onClick={() => handleLogin("KAKAO")}>Kakao 로그인</button>
            <button onClick={() => handleLogin("GITHUB")}>GitHub 로그인</button>
        </div>
    );
};

export default Login;
