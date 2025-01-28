import { create } from "zustand";
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

interface BookState {
    books: Book[];
    loading: boolean;
    error: string | null;
    fetchBooks: () => Promise<void>;
    addBook: (bookData: Omit<Book, "id" | "createdAt" | "updatedAt">) => Promise<void>;
    removeBook: (bookId: number) => Promise<void>;
}

/**
 * Zustand를 활용한 책 상태 관리
 */
const useBookStore = create<BookState>((set) => ({
    books: [],
    loading: false,
    error: null,

    /**
     * 책 목록 불러오기
     */
    fetchBooks: async () => {
        set({ loading: true, error: null });
        try {
            const response = await bookApi.getBookRanks();
            set({ books: response.data, loading: false });
        } catch (err) {
            set({ error: "책 목록을 불러오는 중 오류 발생", loading: false });
        }
    },

    /**
     * 책 추가
     */
    addBook: async (bookData) => {
        try {
            await bookApi.registerBook(bookData);
            set((state) => ({
                books: [...state.books, { ...bookData, id: Date.now(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }],
            }));
        } catch (err) {
            set({ error: "책 추가 중 오류 발생" });
        }
    },

    /**
     * 책 삭제
     */
    removeBook: async (bookId) => {
        try {
            await bookApi.deleteBook(bookId);
            set((state) => ({
                books: state.books.filter((book) => book.id !== bookId),
            }));
        } catch (err) {
            set({ error: "책 삭제 중 오류 발생" });
        }
    },
}));

export default useBookStore;
