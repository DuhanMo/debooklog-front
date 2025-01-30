import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

/**
 * OAuth2 로그인 콜백 페이지
 * @returns {JSX.Element}
 */
const OAuthCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get("code");
        const provider = params.get("provider");

        if (code && provider) {
            login(code, provider)
                .then(() => {
                    navigate("/"); // 로그인 성공 시 홈으로 이동
                })
                .catch(() => {
                    navigate("/login"); // 로그인 실패 시 다시 로그인 페이지로 이동
                });
        } else {
            navigate("/login"); // 필수 값이 없으면 로그인 페이지로 이동
        }
    }, [location, login, navigate]);

    return <Loading />;
};

export default OAuthCallback;
