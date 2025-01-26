import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {loginWithOAuth2} from "../api/api";

function OAuth2RedirectHandler() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get("code");
        const provider = params.get("provider");

        if (!code || !provider) {
            console.error("Missing OAuth2 parameters");
            navigate("/login");
            return;
        }

        loginWithOAuth2(provider, code)
            .then((data) => {
                if (data.accessToken && data.refreshToken) {
                    localStorage.setItem("accessToken", data.accessToken);
                    localStorage.setItem("refreshToken", data.refreshToken);
                    navigate("/");
                } else {
                    console.error("Invalid response:", data);
                    navigate("/login");
                }
            })
            .catch((error) => {
                console.error("Login request failed", error);
                navigate("/login");
            });
    }, [location, navigate]);

    return <div>Logging in...</div>;
}

export default OAuth2RedirectHandler;
