import apiClient from '../api/apiClient';

// 책장 목록 조회 API 호출
const getBookshelves = async () => {
    const response = await apiClient.get('/api/bookshelves');
    // 응답 구조: { message: string, data: BookshelfResponse[] }
    return response.data;
};

// 책장 상세 조회 API 호출
const getBookshelfDetail = async (bookshelfId) => {
    const response = await apiClient.get(`/api/bookshelves/${bookshelfId}`);
    // 응답 구조: { message: string, data: BookshelfDetailResponse }
    return response.data;
};

// 책장명 수정 API 호출 (BookshelfUpdateRequest: { name: string })
const updateBookshelfName = async (bookshelfId, newName) => {
    const response = await apiClient.post(`/api/bookshelves/${bookshelfId}`, { name: newName });
    // 응답 구조: { message: string }
    return response.data;
};

export default {
    getBookshelves,
    getBookshelfDetail,
    updateBookshelfName,
};
