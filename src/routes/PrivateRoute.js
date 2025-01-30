import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/**
 * 인증된 사용자만 접근할 수 있는 보호된 라우트
 * @returns {JSX.Element}
 */
const PrivateRoute = () => {
    const { user } = useAuth();

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
