import { bookshelvesApi } from "../api";

/**
 * 책장 목록 조회 서비스
 * @returns {Promise<Object[]>} - 책장 목록
 */
export const getBookshelves = async () => {
    try {
        return await bookshelvesApi.getBookshelves();
    } catch (error) {
        console.error("책장 목록 조회 실패:", error);
        throw error;
    }
};

/**
 * 특정 책장 상세 조회 서비스
 * @param {number} bookshelfId - 조회할 책장 ID
 * @returns {Promise<Object>} - 책장 상세 정보
 */
export const getBookshelfDetail = async (bookshelfId) => {
    try {
        return await bookshelvesApi.getBookshelfDetail(bookshelfId);
    } catch (error) {
        console.error("책장 상세 조회 실패:", error);
        throw error;
    }
};

/**
 * 책장 업데이트 (이름 변경) 서비스
 * @param {number} bookshelfId - 수정할 책장 ID
 * @param {string} name - 새로운 책장 이름
 * @returns {Promise<void>}
 */
export const updateBookshelf = async (bookshelfId, name) => {
    try {
        await bookshelvesApi.updateBookshelf(bookshelfId, name);
    } catch (error) {
        console.error("책장 업데이트 실패:", error);
        throw error;
    }
};
