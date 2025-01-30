import apiClient from "../utils/apiClient";

/**
 * 책장 목록 조회
 */
export const getBookshelves = async () => {
    try {
        const response = await apiClient.get("/api/bookshelves");
        console.log(response)
        return response.data.data; // ✅ API 응답에서 실제 데이터 부분만 반환
    } catch (error) {
        console.error("책장 목록 조회 실패:", error);
        throw error;
    }
};
