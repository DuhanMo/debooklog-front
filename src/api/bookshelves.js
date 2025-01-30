import axios from "axios";

const API_BASE_URL = "http://debooklog.ap-northeast-2.elasticbeanstalk.com";

/**
 * 모든 책장 목록 조회
 * @returns {Promise<Object[]>} - 책장 목록
 */
export const getBookshelves = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/bookshelves`);
        return response.data.data; // [{ id, memberId, name, imageUrl }, ...]
    } catch (error) {
        console.error("책장 목록 조회 실패:", error);
        throw error;
    }
};

/**
 * 특정 책장 상세 조회
 * @param {number} bookshelfId - 조회할 책장 ID
 * @returns {Promise<Object>} - 책장 상세 정보
 */
export const getBookshelfDetail = async (bookshelfId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/bookshelves/${bookshelfId}`);
        return response.data.data; // { id, name, imageUrl, books: [{ id, title, author, ... }] }
    } catch (error) {
        console.error("책장 상세 조회 실패:", error);
        throw error;
    }
};

/**
 * 책장 업데이트 (이름 변경)
 * @param {number} bookshelfId - 수정할 책장 ID
 * @param {string} name - 새로운 책장 이름
 * @returns {Promise<void>}
 */
export const updateBookshelf = async (bookshelfId, name) => {
    try {
        await axios.post(`${API_BASE_URL}/api/bookshelves/${bookshelfId}`, { name });
    } catch (error) {
        console.error("책장 업데이트 실패:", error);
        throw error;
    }
};
