import { create } from "zustand";
import memberApi from "@/api/memberApi";

interface Member {
    id: number;
    name: string;
    email: string;
    socialId: string;
    provider: "GOOGLE" | "KAKAO" | "GITHUB";
    createdAt: string;
    updatedAt: string;
}

interface MemberState {
    members: Member[];
    loading: boolean;
    error: string | null;
    fetchMembers: () => Promise<void>;
    deleteMember: (memberId: number) => Promise<void>;
}

/**
 * Zustand를 활용한 회원 상태 관리
 */
const useMemberStore = create<MemberState>((set) => ({
    members: [],
    loading: false,
    error: null,

    /**
     * 회원 목록 불러오기
     */
    fetchMembers: async () => {
        set({ loading: true, error: null });
        try {
            const response = await memberApi.getMembers();
            set({ members: response.data, loading: false });
        } catch (err) {
            set({ error: "회원 목록을 불러오는 중 오류 발생", loading: false });
        }
    },

    /**
     * 특정 회원 삭제
     */
    deleteMember: async (memberId) => {
        try {
            await memberApi.deleteMember(memberId);
            set((state) => ({
                members: state.members.filter((member) => member.id !== memberId),
            }));
            alert("회원이 삭제되었습니다.");
        } catch (err) {
            set({ error: "회원 삭제 중 오류 발생" });
        }
    },
}));

export default useMemberStore;
