import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import OAuthCallback from "../pages/OAuthCallback";
import BookshelfDetail from "../pages/BookshelfDetail";
import BookSearch from "../pages/BookSearch";
import BookRank from "../pages/BookRank";
import Profile from "../pages/Profile";
import Navbar from "../components/Navbar";

/**
 * 애플리케이션 라우터 설정
 * @returns {JSX.Element}
 */
const AppRouter = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />

                {/* 공개 페이지 (로그인한 사용자는 접근 불가) */}
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<Login />} />
                </Route>

                {/* OAuth 콜백 페이지 (로그인 과정) */}
                <Route path="/oauth/callback" element={<OAuthCallback />} />

                {/* 인증된 사용자만 접근 가능한 보호된 페이지 */}
                <Route element={<PrivateRoute />}>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/bookshelves/:bookshelfId" element={<BookshelfDetail />} />
                    <Route path="/search" element={<BookSearch />} />
                    <Route path="/ranks" element={<BookRank />} />
                </Route>

                {/* 404 페이지 */}
                <Route path="*" element={<h1>페이지를 찾을 수 없습니다.</h1>} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
