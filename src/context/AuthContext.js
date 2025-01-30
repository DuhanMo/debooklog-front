import React, { createContext, useState, useEffect } from "react";
import { authApi } from "../api";
import { getAccessToken, setAccessToken, removeAccessToken } from "../utils/localStorage";

export const AuthContext = createContext(null);

/**
 * 인증 상태를 관리하는 컨텍스트 프로바이더
 * @param {Object} props
 * @param {JSX.Element} props.children - 하위 컴포넌트
 * @returns {JSX.Element}
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = getAccessToken();
        if (token) {
            // 토큰이 있을 경우 사용자 정보를 가져오는 로직 추가 가능
            setUser({ token }); // 실제로는 API 호출을 통해 사용자 정보 가져와야 함
        }
    }, []);

    /**
     * 로그인 처리
     * @param {string} code - OAuth2 인증 코드
     * @param {string} provider - "GOOGLE", "KAKAO", "GITHUB"
     */
    const login = async (code, provider) => {
        try {
            const { accessToken, refreshToken } = await authApi.loginWithOAuth2(code, provider);
            setAccessToken(accessToken);
            setUser({ token: accessToken });
        } catch (error) {
            console.error("로그인 실패:", error);
        }
    };

    /**
     * 로그아웃 처리
     */
    const logout = () => {
        removeAccessToken();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
