import { useState, useEffect } from "react";
import bookApi from "@/api/bookApi";

interface Book {
    id: number;
    title: string;
    author: string;
    isbn: string[];
    thumbnail: string;
    createdAt: string;
    updatedAt: string;
}

const useBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * 전체 책 목록 불러오기
     */
    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const response = await bookApi.getBookRanks();
                setBooks(response.data);
            } catch (err) {
                setError("책 목록을 불러오는 중 오류 발생");
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    /**
     * 책 검색
     */
    const searchBooks = async (title: string) => {
        setLoading(true);
        try {
            const response = await bookApi.searchBooks(title);
            setBooks(response.data);
        } catch (err) {
            setError("책 검색 중 오류 발생");
        } finally {
            setLoading(false);
        }
    };

    /**
     * 새로운 책 등록
     */
    const registerBook = async (bookData: Omit<Book, "id" | "createdAt" | "updatedAt">) => {
        try {
            await bookApi.registerBook(bookData);
            alert("책이 등록되었습니다.");
        } catch (err) {
            setError("책 등록 중 오류 발생");
        }
    };

    /**
     * 책 좋아요 / 좋아요 취소
     */
    const toggleLike = async (bookId: number, liked: boolean) => {
        try {
            if (liked) {
                await bookApi.cancelLike(bookId);
            } else {
                await bookApi.createLike(bookId);
            }
            setBooks((prevBooks) =>
                prevBooks.map((book) =>
                    book.id === bookId ? { ...book, liked: !liked } : book
                )
            );
        } catch (err) {
            setError("좋아요 처리 중 오류 발생");
        }
    };

    /**
     * 책 삭제
     */
    const deleteBook = async (bookId: number) => {
        try {
            await bookApi.deleteBook(bookId);
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
            alert("책이 삭제되었습니다.");
        } catch (err) {
            setError("책 삭제 중 오류 발생");
        }
    };

    return {
        books,
        loading,
        error,
        searchBooks,
        registerBook,
        toggleLike,
        deleteBook,
    };
};

export default useBooks;
