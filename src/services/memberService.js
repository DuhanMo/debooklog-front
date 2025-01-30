import { membersApi } from "../api";

/**
 * 모든 사용자 목록 조회 서비스
 * @returns {Promise<Object[]>} - 사용자 목록
 */
export const getMembers = async () => {
    try {
        return await membersApi.getMembers();
    } catch (error) {
        console.error("사용자 목록 조회 실패:", error);
        throw error;
    }
};

/**
 * 회원 탈퇴 서비스
 * @param {number} memberId - 탈퇴할 사용자 ID
 * @returns {Promise<void>}
 */
export const deleteMember = async (memberId) => {
    try {
        await membersApi.deleteMember(memberId);
    } catch (error) {
        console.error("회원 탈퇴 실패:", error);
        throw error;
    }
};
