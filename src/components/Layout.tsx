import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
    children: ReactNode;
}

/**
 * 기본 레이아웃 컴포넌트
 */
const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* 헤더 */}
            <header className="bg-blue-600 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-xl font-bold">📚 Debooklog</Link>
                    <nav>
                        <ul className="flex space-x-4">
                            <li><Link to="/bookshelves" className="hover:underline">책장</Link></li>
                            <li><Link to="/books" className="hover:underline">도서 목록</Link></li>
                            <li><Link to="/members" className="hover:underline">회원</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* 메인 컨텐츠 */}
            <main className="flex-grow container mx-auto p-4">{children}</main>

            {/* 푸터 */}
            <footer className="bg-gray-800 text-white text-center p-4">
                <p>© 2025 Debooklog. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;
