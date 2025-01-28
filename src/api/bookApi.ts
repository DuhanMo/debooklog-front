import axiosInstance from "./axiosInstance";

interface BookRegisterRequest {
    title: string;
    author: string;
    isbn: string[];
    thumbnail: string;
}

interface ApiResponseUnit {
    message: string;
}

interface ApiResponseListBookInformationResponse {
    message: string;
    data: BookInformationResponse[];
}

interface BookInformationResponse {
    title: string;
    author: string;
    isbn: string[];
    thumbnail: string;
}

interface ApiResponseListBookRankResponse {
    message: string;
    data: BookRankResponse[];
}

interface BookRankResponse {
    rank: number;
    isbn: string;
    bookTitle: string;
    count: number;
}

/**
 * 새로운 책을 등록하는 API 요청
 */
export const registerBook = async (data: BookRegisterRequest): Promise<ApiResponseUnit> => {
    const response = await axiosInstance.post<ApiResponseUnit>("/api/books", data);
    return response.data;
};

/**
 * 특정 책을 현재 읽고 있는 상태로 설정하는 API 요청
 */
export const readNow = async (bookId: number): Promise<ApiResponseUnit> => {
    const response = await axiosInstance.post<ApiResponseUnit>(`/api/books/${bookId}/reading`);
    return response.data;
};

/**
 * 특정 책에 좋아요 추가
 */
export const createLike = async (bookId: number): Promise<ApiResponseUnit> => {
    const response = await axiosInstance.post<ApiResponseUnit>(`/api/books/${bookId}/like`);
    return response.data;
};

/**
 * 특정 책의 좋아요 취소
 */
export const cancelLike = async (bookId: number): Promise<ApiResponseUnit> => {
    const response = await axiosInstance.post<ApiResponseUnit>(`/api/books/${bookId}/cancel-like`);
    return response.data;
};

/**
 * 특정 책을 완료 상태로 설정
 */
export const markAsDone = async (bookId: number): Promise<ApiResponseUnit> => {
    const response = await axiosInstance.post<ApiResponseUnit>(`/api/books/${bookId}/done`);
    return response.data;
};

/**
 * 특정 책 삭제
 */
export const deleteBook = async (bookId: number): Promise<ApiResponseUnit> => {
    const response = await axiosInstance.delete<ApiResponseUnit>(`/api/books/${bookId}`);
    return response.data;
};

/**
 * 책 검색
 */
export const searchBooks = async (title: string): Promise<ApiResponseListBookInformationResponse> => {
    const response = await axiosInstance.get<ApiResponseListBookInformationResponse>(
        `/api/books/search?title=${encodeURIComponent(title)}`
    );
    return response.data;
};

/**
 * 인기 책 랭킹 조회
 */
export const getBookRanks = async (): Promise<ApiResponseListBookRankResponse> => {
    const response = await axiosInstance.get<ApiResponseListBookRankResponse>("/api/books/ranks");
    return response.data;
};

export default {
    registerBook,
    readNow,
    createLike,
    cancelLike,
    markAsDone,
    deleteBook,
    searchBooks,
    getBookRanks,
};
