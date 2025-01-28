/**
 * OAuth2 로그인 요청 타입
 */
export interface OAuth2LoginRequest {
    provider: "GOOGLE" | "KAKAO" | "GITHUB";
    code: string;
}

/**
 * 로그인 응답 타입
 */
export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

/**
 * 책 정보 타입
 */
export interface Book {
    id: number;
    title: string;
    author: string;
    isbn: string[];
    thumbnail: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * 책 등록 요청 타입
 */
export interface BookRegisterRequest {
    title: string;
    author: string;
    isbn: string[];
    thumbnail: string;
}

/**
 * 책 검색 응답 타입
 */
export interface BookInformationResponse {
    title: string;
    author: string;
    isbn: string[];
    thumbnail: string;
}

/**
 * 책 랭킹 응답 타입
 */
export interface BookRankResponse {
    rank: number;
    isbn: string;
    bookTitle: string;
    count: number;
}

/**
 * 책장 정보 타입
 */
export interface Bookshelf {
    id: number;
    memberId: number;
    name: string;
    imageUrl?: string;
}

/**
 * 책장 상세 정보 타입
 */
export interface BookshelfDetail {
    id: number;
    name: string;
    imageUrl?: string;
    books: Book[];
}

/**
 * 회원 정보 타입
 */
export interface Member {
    id: number;
    name: string;
    email: string;
    socialId: string;
    provider: "GOOGLE" | "KAKAO" | "GITHUB";
    createdAt: string;
    updatedAt: string;
}

/**
 * API 응답 공통 타입
 */
export interface ApiResponse<T> {
    message: string;
    data: T;
}

export interface ApiResponseUnit {
    message: string;
}
