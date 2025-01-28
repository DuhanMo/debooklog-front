import { create } from "zustand";
import bookshelfApi from "@/api/bookshelfApi";

interface Bookshelf {
    id: number;
    memberId: number;
    name: string;
    imageUrl?: string;
}

interface BookshelfState {
    bookshelves: Bookshelf[];
    selectedBookshelf: Bookshelf | null;
    loading: boolean;
    error: string | null;
    fetchBookshelves: () => Promise<void>;
    fetchBookshelfDetail: (bookshelfId: number) => Promise<void>;
    updateBookshelf: (bookshelfId: number, name: string) => Promise<void>;
}

/**
 * Zustand를 활용한 책장 상태 관리
 */
const useBookshelfStore = create<BookshelfState>((set) => ({
    bookshelves: [],
    selectedBookshelf: null,
    loading: false,
    error: null,

    /**
     * 책장 목록 불러오기
     */
    fetchBookshelves: async () => {
        set({ loading: true, error: null });
        try {
            const response = await bookshelfApi.getBookshelves();
            set({ bookshelves: response.data, loading: false });
        } catch (err) {
            set({ error: "책장 목록을 불러오는 중 오류 발생", loading: false });
        }
    },

    /**
     * 특정 책장 상세 조회
     */
    fetchBookshelfDetail: async (bookshelfId) => {
        set({ loading: true, error: null });
        try {
            const response = await bookshelfApi.getBookshelfDetail(bookshelfId);
            set({ selectedBookshelf: response.data, loading: false });
        } catch (err) {
            set({ error: "책장 정보를 가져오는 중 오류 발생", loading: false });
        }
    },

    /**
     * 책장 정보 수정
     */
    updateBookshelf: async (bookshelfId, name) => {
        try {
            await bookshelfApi.updateBookshelf(bookshelfId, { name });
            set((state) => ({
                bookshelves: state.bookshelves.map((shelf) =>
                    shelf.id === bookshelfId ? { ...shelf, name } : shelf
                ),
            }));
            alert("책장이 수정되었습니다.");
        } catch (err) {
            set({ error: "책장 수정 중 오류 발생" });
        }
    },
}));

export default useBookshelfStore;
