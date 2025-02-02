import apiClient from '../api/apiClient';

// 제목으로 책 검색 (GET /api/books/search?title=...)
const searchBooks = async (title) => {
    const response = await apiClient.get(`/api/books/search?title=${encodeURIComponent(title)}`);
    // 응답 구조: { message: string, data: BookInformationResponse[] }
    return response.data;
};

// 책 등록 (POST /api/books)
const registerBook = async (book) => {
    const response = await apiClient.post('/api/books', book);
    // 응답 구조: { message: string } (ApiResponseUnit)
    return response.data;
};

export default {
    searchBooks,
    registerBook,
};
