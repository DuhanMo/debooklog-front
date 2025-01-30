import React, { createContext, useState, useEffect } from "react";
import { login as authServiceLogin, logout as authServiceLogout } from "../services/authService";
import { getAccessToken } from "../utils/localStorage";

export const AuthContext = createContext(null);

/**
 * 인증 상태를 관리하는 컨텍스트 프로바이더
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = getAccessToken();
        if (token) {
            setUser({ token });
        }
    }, []);

    /**
     * 로그인 (authService의 `login()` 사용)
     */
    const login = async (code, provider) => {
        try {
            await authServiceLogin(code, provider); // ✅ authService 활용
            const token = getAccessToken();
            setUser({ token });
        } catch (error) {
            console.error("로그인 실패:", error);
        }
    };

    /**
     * 로그아웃 (authService의 `logout()` 사용)
     */
    const logout = () => {
        authServiceLogout(); // ✅ authService 활용
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
