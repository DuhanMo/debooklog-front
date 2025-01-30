import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

/**
 * 네비게이션 바 컴포넌트
 * @returns {JSX.Element}
 */
const Navbar = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    /**
     * 로그아웃 처리 함수
     */
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
        navigate("/");
    };

    return (
        <nav>
            <Link to="/">홈</Link>
            {user ? (
                <>
                    <Link to="/profile">프로필</Link>
                    <button onClick={handleLogout}>로그아웃</button>
                </>
            ) : (
                <Link to="/login">로그인</Link>
            )}
        </nav>
    );
};

export default Navbar;
