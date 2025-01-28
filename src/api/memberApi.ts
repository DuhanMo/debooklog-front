import axiosInstance from "./axiosInstance";

interface MemberResponse {
    id: number;
    name: string;
    email: string;
    socialId: string;
    provider: "GOOGLE" | "KAKAO" | "GITHUB";
    createdAt: string;
    updatedAt: string;
}

interface ApiResponseListMemberResponse {
    message: string;
    data: MemberResponse[];
}

interface ApiResponseUnit {
    message: string;
}

/**
 * 모든 회원 목록 조회
 */
export const getMembers = async (): Promise<ApiResponseListMemberResponse> => {
    const response = await axiosInstance.get<ApiResponseListMemberResponse>("/api/members");
    return response.data;
};

/**
 * 특정 회원 삭제
 */
export const deleteMember = async (memberId: number): Promise<ApiResponseUnit> => {
    const response = await axiosInstance.delete<ApiResponseUnit>(`/api/members/${memberId}`);
    return response.data;
};

export default {
    getMembers,
    deleteMember,
};
