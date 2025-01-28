import { useState, useEffect } from "react";
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

const useMembers = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * 전체 회원 목록 불러오기
     */
    useEffect(() => {
        const fetchMembers = async () => {
            setLoading(true);
            try {
                const response = await memberApi.getMembers();
                setMembers(response.data);
            } catch (err) {
                setError("회원 목록을 불러오는 중 오류 발생");
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    /**
     * 특정 회원 삭제
     */
    const deleteMember = async (memberId: number) => {
        try {
            await memberApi.deleteMember(memberId);
            setMembers((prev) => prev.filter((member) => member.id !== memberId));
            alert("회원이 삭제되었습니다.");
        } catch (err) {
            setError("회원 삭제 중 오류 발생");
        }
    };

    return {
        members,
        loading,
        error,
        deleteMember,
    };
};

export default useMembers;
