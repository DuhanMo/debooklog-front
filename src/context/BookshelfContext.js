import React, { createContext, useState, useEffect, useCallback } from "react";
import { getBookshelves, getBookshelfDetail } from "../services/bookshelfService";

export const BookshelfContext = createContext(null);

export const BookshelfProvider = ({ children }) => {
    const [bookshelves, setBookshelves] = useState([]);
    const [selectedBookshelf, setSelectedBookshelf] = useState(null);

    /**
     * 책장 목록 조회
     */
    const fetchBookshelves = useCallback(async () => {
        try {
            const data = await getBookshelves();
            setBookshelves(data);
        } catch (error) {
            console.error("책장 목록 불러오기 실패:", error);
        }
    }, []);

    /**
     * 특정 책장 상세 정보 조회 (useCallback 적용)
     */
    const fetchBookshelfDetail = useCallback(async (bookshelfId) => {
        try {
            const data = await getBookshelfDetail(bookshelfId);
            setSelectedBookshelf(data);
        } catch (error) {
            console.error("책장 상세 정보 불러오기 실패:", error);
        }
    }, []);

    useEffect(() => {
        fetchBookshelves();
    }, [fetchBookshelves]);

    return (
        <BookshelfContext.Provider value={{ bookshelves, selectedBookshelf, fetchBookshelves, fetchBookshelfDetail }}>
            {children}
        </BookshelfContext.Provider>
    );
};
