import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * 인증 관련 기능을 제공하는 커스텀 훅
 * @returns {Object} 인증 관련 상태 및 함수
 */
const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth 훅은 AuthProvider 내부에서 사용해야 합니다.");
    }

    return context;
};

export default useAuth;
