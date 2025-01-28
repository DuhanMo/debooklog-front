import { useState, useEffect } from "react";
import authApi from "@/api/authApi";

interface User {
    accessToken: string;
    refreshToken: string;
}

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            setUser({ accessToken: token, refreshToken: "" }); // refreshToken은 서버에서 가져오도록 설정 가능
        }
    }, []);

    /**
     * OAuth2 로그인 처리
     */
    const login = async (provider: "GOOGLE" | "KAKAO" | "GITHUB", code: string) => {
        try {
            const response = await authApi.loginByAuthCode({ provider, code });
            localStorage.setItem("accessToken", response.accessToken);
            localStorage.setItem("refreshToken", response.refreshToken);
            setUser(response);
        } catch (error) {
            console.error("로그인 실패:", error);
        }
    };

    /**
     * 로그아웃 처리
     */
    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
        window.location.href = "/login";
    };

    return { user, login, logout };
};

export default useAuth;
