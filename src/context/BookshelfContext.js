import React, { createContext, useState, useEffect } from "react";
import { bookshelvesApi } from "../api";

export const BookshelfContext = createContext(null);

/**
 * 책장 데이터를 관리하는 컨텍스트 프로바이더
 * @param {Object} props
 * @param {JSX.Element} props.children - 하위 컴포넌트
 * @returns {JSX.Element}
 */
export const BookshelfProvider = ({ children }) => {
    const [bookshelves, setBookshelves] = useState([]);
    const [selectedBookshelf, setSelectedBookshelf] = useState(null);

    /**
     * 모든 책장 목록을 불러오는 함수
     */
    const fetchBookshelves = async () => {
        try {
            const data = await bookshelvesApi.getBookshelves();
            setBookshelves(data);
        } catch (error) {
            console.error("책장 목록 불러오기 실패:", error);
        }
    };

    /**
     * 특정 책장 상세 정보를 불러오는 함수
     * @param {number} bookshelfId - 조회할 책장 ID
     */
    const fetchBookshelfDetail = async (bookshelfId) => {
        try {
            const data = await bookshelvesApi.getBookshelfDetail(bookshelfId);
            setSelectedBookshelf(data);
        } catch (error) {
            console.error("책장 상세 정보 불러오기 실패:", error);
        }
    };

    useEffect(() => {
        fetchBookshelves();
    }, []);

    return (
        <BookshelfContext.Provider
            value={{
                bookshelves,
                selectedBookshelf,
                fetchBookshelves,
                fetchBookshelfDetail,
            }}
        >
            {children}
        </BookshelfContext.Provider>
    );
};
