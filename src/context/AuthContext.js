import React, { createContext, useState, useEffect, useContext } from "react";
import { login as authServiceLogin, logout as authServiceLogout } from "../services/authService";
import { getAccessToken } from "../utils/localStorage";
import { BookshelfContext } from "./BookshelfContext"; // ✅ BookshelfContext import

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const { fetchBookshelves } = useContext(BookshelfContext); // ✅ 책장 갱신 함수 가져오기

    useEffect(() => {
        const token = getAccessToken();
        if (token) {
            setUser({ token });
        }
    }, []);

    /**
     * 로그인 (책장 목록도 갱신)
     */
    const login = async (code, provider) => {
        try {
            await authServiceLogin(code, provider);
            const token = getAccessToken();
            setUser({ token });

            fetchBookshelves(); // ✅ 로그인 후 책장 목록 업데이트
        } catch (error) {
            console.error("로그인 실패:", error);
        }
    };

    /**
     * 로그아웃
     */
    const logout = () => {
        authServiceLogout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
