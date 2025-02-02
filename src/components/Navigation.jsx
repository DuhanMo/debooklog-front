import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navigation = () => {
    const isLoggedIn = Boolean(localStorage.getItem('accessToken'));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // 로그아웃 후 홈으로 이동
        navigate('/');
    };

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {isLoggedIn ? (
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                ) : (
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;
