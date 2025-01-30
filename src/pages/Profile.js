import React, { useContext } from "react";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import Button from "../components/Button";

/**
 * 프로필 페이지
 * @returns {JSX.Element}
 */
const Profile = () => {
    const { user, logout } = useAuth();

    if (!user) {
        return <Loading />;
    }

    return (
        <div>
            <h1>프로필</h1>
            <p><strong>이메일:</strong> {user.email || "알 수 없음"}</p>
            <p><strong>로그인 제공자:</strong> {user.provider || "알 수 없음"}</p>
            <Button label="로그아웃" onClick={logout} />
        </div>
    );
};

export default Profile;
