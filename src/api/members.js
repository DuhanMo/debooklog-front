import apiClient from "../utils/apiClient";
import CONFIG from "../config";

const API_BASE_URL = CONFIG.API_BASE_URL;


/**
 * 모든 사용자 목록 조회
 * @returns {Promise<Object[]>} - 사용자 목록
 */
export const getMembers = async () => {
    try {
        const response = await apiClient.get(`${API_BASE_URL}/api/members`);
        return response.data; // [{ id, name, email, provider, createdAt, updatedAt }, ...]
    } catch (error) {
        console.error("사용자 목록 조회 실패:", error);
        throw error;
    }
};

/**
 * 회원 탈퇴
 * @param {number} memberId - 탈퇴할 사용자 ID
 * @returns {Promise<void>}
 */
export const deleteMember = async (memberId) => {
    try {
        await apiClient.delete(`${API_BASE_URL}/api/members/${memberId}`);
    } catch (error) {
        console.error("회원 탈퇴 실패:", error);
        throw error;
    }
};
