import axiosInstance from "./axiosInstance";

interface ApiResponseListBookshelfResponse {
    message: string;
    data: BookshelfResponse[];
}

interface BookshelfResponse {
    id: number;
    memberId: number;
    name: string;
    imageUrl?: string;
}

interface ApiResponseBookshelfDetailResponse {
    message: string;
    data: BookshelfDetailResponse;
}

interface BookshelfDetailResponse {
    id: number;
    name: string;
    imageUrl?: string;
    books: BookResponse[];
}

interface BookResponse {
    id: number;
    title: string;
    author: string;
    isbn: string[];
    thumbnail: string;
    createdAt: string;
    updatedAt: string;
}

interface BookshelfUpdateRequest {
    name: string;
}

interface ApiResponseUnit {
    message: string;
}

/**
 * 모든 책장 목록 조회
 */
export const getBookshelves = async (): Promise<ApiResponseListBookshelfResponse> => {
    const response = await axiosInstance.get<ApiResponseListBookshelfResponse>("/api/bookshelves");
    return response.data;
};

/**
 * 특정 책장의 상세 정보 조회
 */
export const getBookshelfDetail = async (bookshelfId: number): Promise<ApiResponseBookshelfDetailResponse> => {
    const response = await axiosInstance.get<ApiResponseBookshelfDetailResponse>(
        `/api/bookshelves/${bookshelfId}`
    );
    return response.data;
};

/**
 * 책장 정보 수정
 */
export const updateBookshelf = async (bookshelfId: number, data: BookshelfUpdateRequest): Promise<ApiResponseUnit> => {
    const response = await axiosInstance.post<ApiResponseUnit>(`/api/bookshelves/${bookshelfId}`, data);
    return response.data;
};

export default {
    getBookshelves,
    getBookshelfDetail,
    updateBookshelf,
};
