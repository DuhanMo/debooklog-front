import { useState, useEffect } from "react";
import bookshelfApi from "@/api/bookshelfApi";

interface Bookshelf {
    id: number;
    memberId: number;
    name: string;
    imageUrl?: string;
}

const useBookshelf = () => {
    const [bookshelves, setBookshelves] = useState<Bookshelf[]>([]);
    const [selectedBookshelf, setSelectedBookshelf] = useState<Bookshelf | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * 전체 책장 목록 불러오기
     */
    useEffect(() => {
        const fetchBookshelves = async () => {
            setLoading(true);
            try {
                const response = await bookshelfApi.getBookshelves();
                setBookshelves(response.data);
            } catch (err) {
                setError("책장 목록을 불러오는 중 오류 발생");
            } finally {
                setLoading(false);
            }
        };

        fetchBookshelves();
    }, []);

    /**
     * 특정 책장 상세 조회
     */
    const fetchBookshelfDetail = async (bookshelfId: number) => {
        setLoading(true);
        try {
            const response = await bookshelfApi.getBookshelfDetail(bookshelfId);
            setSelectedBookshelf(response.data);
        } catch (err) {
            setError("책장 정보를 가져오는 중 오류 발생");
        } finally {
            setLoading(false);
        }
    };

    /**
     * 책장 정보 수정
     */
    const updateBookshelf = async (bookshelfId: number, name: string) => {
        try {
            await bookshelfApi.updateBookshelf(bookshelfId, { name });
            setBookshelves((prev) =>
                prev.map((shelf) => (shelf.id === bookshelfId ? { ...shelf, name } : shelf))
            );
            alert("책장이 수정되었습니다.");
        } catch (err) {
            setError("책장 수정 중 오류 발생");
        }
    };

    return {
        bookshelves,
        selectedBookshelf,
        loading,
        error,
        fetchBookshelfDetail,
        updateBookshelf,
    };
};

export default useBookshelf;
