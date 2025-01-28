import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import BookshelfDetail from "@/pages/BookshelfDetail";
import BookDetail from "@/pages/BookDetail";
import MemberList from "@/pages/MemberList";
import SearchBooks from "@/pages/SearchBooks";

const AppRoutes = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/bookshelves/:bookshelfId" element={<BookshelfDetail />} />
                    <Route path="/books/:bookId" element={<BookDetail />} />
                    <Route path="/members" element={<MemberList />} />
                    <Route path="/books/search" element={<SearchBooks />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default AppRoutes;
