import React, { createContext, useState, useEffect } from "react";
import { getBookshelves, getBookshelfDetail } from "../services/bookshelfService"; // ✅ services 사용

export const BookshelfContext = createContext(null);

export const BookshelfProvider = ({ children }) => {
    const [bookshelves, setBookshelves] = useState([]);
    const [selectedBookshelf, setSelectedBookshelf] = useState(null);

    /**
     * 책장 목록 조회
     */
    const fetchBookshelves = async () => {
        try {
            const data = await getBookshelves(); // ✅ services 사용
            setBookshelves(data);
        } catch (error) {
            console.error("책장 목록 불러오기 실패:", error);
        }
    };

    /**
     * 특정 책장 상세 정보 조회
     */
    const fetchBookshelfDetail = async (bookshelfId) => {
        try {
            const data = await getBookshelfDetail(bookshelfId); // ✅ services 사용
            setSelectedBookshelf(data);
        } catch (error) {
            console.error("책장 상세 정보 불러오기 실패:", error);
        }
    };

    useEffect(() => {
        fetchBookshelves();
    }, []);

    return (
        <BookshelfContext.Provider value={{ bookshelves, selectedBookshelf, fetchBookshelves, fetchBookshelfDetail }}>
            {children}
        </BookshelfContext.Provider>
    );
};
