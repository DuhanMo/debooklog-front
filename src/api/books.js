import apiClient from "../utils/apiClient";
import CONFIG from "../config";

const API_BASE_URL = CONFIG.API_BASE_URL;

/**
 * 새로운 책 등록
 * @param {Object} bookData - 등록할 책 정보 (title, author, isbn, thumbnail)
 * @returns {Promise<void>}
 */
export const registerBook = async (bookData) => {
    try {
        await apiClient.post(`${API_BASE_URL}/api/books`, bookData);
    } catch (error) {
        console.error("책 등록 실패:", error);
        throw error;
    }
};

/**
 * 책 검색
 * @param {string} title - 검색할 책 제목
 * @returns {Promise<Object[]>} - 검색된 책 목록
 */
export const searchBooks = async (title) => {
    try {
        const response = await apiClient.get(`${API_BASE_URL}/api/books/search`, {
            params: { title },
        });
        return response.data.data; // [{ title, author, isbn, thumbnail }, ...]
    } catch (error) {
        console.error("책 검색 실패:", error);
        throw error;
    }
};

/**
 * 책 좋아요
 * @param {number} bookId - 좋아요할 책 ID
 * @returns {Promise<void>}
 */
export const likeBook = async (bookId) => {
    try {
        await apiClient.post(`${API_BASE_URL}/api/books/${bookId}/like`);
    } catch (error) {
        console.error("책 좋아요 실패:", error);
        throw error;
    }
};

/**
 * 책 좋아요 취소
 * @param {number} bookId - 좋아요 취소할 책 ID
 * @returns {Promise<void>}
 */
export const cancelLikeBook = async (bookId) => {
    try {
        await apiClient.post(`${API_BASE_URL}/api/books/${bookId}/cancel-like`);
    } catch (error) {
        console.error("책 좋아요 취소 실패:", error);
        throw error;
    }
};

/**
 * 책 읽기 시작
 * @param {number} bookId - 읽기 시작할 책 ID
 * @returns {Promise<void>}
 */
export const startReadingBook = async (bookId) => {
    try {
        await apiClient.post(`${API_BASE_URL}/api/books/${bookId}/reading`);
    } catch (error) {
        console.error("책 읽기 시작 실패:", error);
        throw error;
    }
};

/**
 * 책 읽기 완료
 * @param {number} bookId - 읽기 완료할 책 ID
 * @returns {Promise<void>}
 */
export const completeBook = async (bookId) => {
    try {
        await apiClient.post(`${API_BASE_URL}/api/books/${bookId}/done`);
    } catch (error) {
        console.error("책 읽기 완료 실패:", error);
        throw error;
    }
};

/**
 * 책 삭제
 * @param {number} bookId - 삭제할 책 ID
 * @returns {Promise<void>}
 */
export const deleteBook = async (bookId) => {
    try {
        await apiClient.delete(`${API_BASE_URL}/api/books/${bookId}`);
    } catch (error) {
        console.error("책 삭제 실패:", error);
        throw error;
    }
};

/**
 * 인기 책 랭킹 조회
 * @returns {Promise<Object[]>} - 인기 책 랭킹 목록
 */
export const findBookRanks = async () => {
    try {
        const response = await apiClient.get(`${API_BASE_URL}/api/books/ranks`);
        return response.data.data; // [{ rank, isbn, bookTitle, count }, ...]
    } catch (error) {
        console.error("책 랭킹 조회 실패:", error);
        throw error;
    }
};

