import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/**
 * 로그인한 사용자는 접근할 수 없는 라우트
 * (예: 로그인 페이지, 회원가입 페이지)
 * @returns {JSX.Element}
 */
const PublicRoute = () => {
    const { user } = useAuth();

    return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
