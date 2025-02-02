import apiClient from '../api/apiClient';

// 책장 목록 조회 API 호출
const getBookshelves = async () => {
    const response = await apiClient.get('/api/bookshelves');
    return response.data;
};

export default {
    getBookshelves,
};
