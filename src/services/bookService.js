import { booksApi } from "../api";

/**
 * 책 등록 서비스
 * @param {Object} bookData - 등록할 책 정보 (title, author, isbn, thumbnail)
 * @returns {Promise<void>}
 */
export const registerBook = async (bookData) => {
    try {
        await booksApi.registerBook(bookData);
    } catch (error) {
        console.error("책 등록 실패:", error);
        throw error;
    }
};

/**
 * 책 검색 서비스
 * @param {string} title - 검색할 책 제목
 * @returns {Promise<Object[]>} - 검색된 책 목록
 */
export const searchBooks = async (title) => {
    try {
        return await booksApi.searchBooks(title);
    } catch (error) {
        console.error("책 검색 실패:", error);
        throw error;
    }
};

/**
 * 책 좋아요 서비스
 * @param {number} bookId - 좋아요할 책 ID
 * @returns {Promise<void>}
 */
export const likeBook = async (bookId) => {
    try {
        await booksApi.likeBook(bookId);
    } catch (error) {
        console.error("책 좋아요 실패:", error);
        throw error;
    }
};

/**
 * 책 좋아요 취소 서비스
 * @param {number} bookId - 좋아요 취소할 책 ID
 * @returns {Promise<void>}
 */
export const cancelLikeBook = async (bookId) => {
    try {
        await booksApi.cancelLikeBook(bookId);
    } catch (error) {
        console.error("책 좋아요 취소 실패:", error);
        throw error;
    }
};

/**
 * 책 읽기 시작 서비스
 * @param {number} bookId - 읽기 시작할 책 ID
 * @returns {Promise<void>}
 */
export const startReadingBook = async (bookId) => {
    try {
        await booksApi.startReadingBook(bookId);
    } catch (error) {
        console.error("책 읽기 시작 실패:", error);
        throw error;
    }
};

/**
 * 책 읽기 완료 서비스
 * @param {number} bookId - 읽기 완료할 책 ID
 * @returns {Promise<void>}
 */
export const completeBook = async (bookId) => {
    try {
        await booksApi.completeBook(bookId);
    } catch (error) {
        console.error("책 읽기 완료 실패:", error);
        throw error;
    }
};

/**
 * 책 삭제 서비스
 * @param {number} bookId - 삭제할 책 ID
 * @returns {Promise<void>}
 */
export const deleteBook = async (bookId) => {
    try {
        await booksApi.deleteBook(bookId);
    } catch (error) {
        console.error("책 삭제 실패:", error);
        throw error;
    }
};

/**
 * 인기 책 랭킹 조회 서비스
 * @returns {Promise<Object[]>} - 인기 책 랭킹 목록
 */
export const getBookRanks = async () => {
    try {
        return await booksApi.findBookRanks();
    } catch (error) {
        console.error("책 랭킹 데이터를 불러오는 데 실패했습니다.");
        throw error;
    }
};
