import React, { createContext, useState, useEffect } from "react";
import { getBookshelves } from "../services/bookshelfService";

export const BookshelfContext = createContext(null);

export const BookshelfProvider = ({ children }) => {
    const [bookshelves, setBookshelves] = useState([]);
    const [selectedBookshelf, setSelectedBookshelf] = useState(null);

    /**
     * 책장 목록 조회 (외부에서도 호출 가능하도록 변경)
     */
    const fetchBookshelves = async () => {
        try {
            const data = await getBookshelves();
            setBookshelves(data);
        } catch (error) {
            console.error("책장 목록 불러오기 실패:", error);
        }
    };

    useEffect(() => {
        fetchBookshelves(); // ✅ 초기 로드
    }, []);

    return (
        <BookshelfContext.Provider value={{ bookshelves, selectedBookshelf, fetchBookshelves }}>
            {children}
        </BookshelfContext.Provider>
    );
};
