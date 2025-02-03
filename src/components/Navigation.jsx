import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Navbar = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const NavList = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
    list-style: none;
    margin: 0;
    padding: 0;
`;

const NavItem = styled.li`
    font-size: 16px;
    font-weight: bold;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit; /* ✅ 기본 색상 유지 */
    font-size: 16px;
    font-weight: bold;
    transition: color 0.2s ease-in-out;

    &:hover {
        color: #ff4d4f; /* ✅ 호버 시 빨간색 */
    }

    &:focus {
        color: inherit; /* ✅ 클릭 후 색 유지 X */
    }
`;

const LogoutText = styled.span`
    text-decoration: none;
    color: inherit;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        color: #ff4d4f;
    }
`;

const Navigation = () => {
    const isLoggedIn = Boolean(localStorage.getItem("accessToken"));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/");
    };

    return (
        <Navbar>
            <NavList>
                <NavItem>
                    <StyledLink to="/">홈</StyledLink>
                </NavItem>
                <NavItem>
                    <StyledLink to="/search">도서 검색</StyledLink>
                </NavItem>
                {isLoggedIn ? (
                    <NavItem>
                        <LogoutText onClick={handleLogout}>로그아웃</LogoutText>
                    </NavItem>
                ) : (
                    <NavItem>
                        <StyledLink to="/login">로그인</StyledLink>
                    </NavItem>
                )}
            </NavList>
        </Navbar>
    );
};

export default Navigation;
