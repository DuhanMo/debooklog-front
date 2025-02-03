import React from "react";
import styled from "styled-components";
import config from "../config";

// 사용할 소셜 로그인 제공자 목록
const providers = [
    { name: "GOOGLE", label: "구글 로그인", color: "#4285F4" }, // 구글 공식 파란색
    { name: "KAKAO", label: "카카오 로그인", color: "#FEE500" }, // 카카오 공식 노란색
];

// 환경 변수에 정의된 베이스 URL을 사용하고, 없으면 기본값을 사용
const BASE_URL = config.BASE_URL;

// 📌 로그인 페이지 컨테이너
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #f7f7f7;
`;

// 📌 로그인 박스 스타일
const LoginBox = styled.div`
    background: white;
    padding: 32px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 350px;
`;

// 📌 제목 스타일
const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 16px;
`;

// 📌 설명 스타일
const Description = styled.p`
    font-size: 16px;
    color: #555;
    margin-bottom: 24px;
`;

// 📌 버튼 컨테이너 (버튼들의 너비를 동일하게 맞추기 위함)
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px; /* ✅ 버튼 간격 균일하게 */
`;

// 📌 버튼 스타일
const LoginButton = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%; /* ✅ 버튼 크기 균일화 */
    box-sizing: border-box; /* ✅ padding 포함해서 크기 계산 */
    padding: 12px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    color: ${({ provider }) => (provider === "KAKAO" ? "#3c1e1e" : "white")};
    background: ${({ color }) => color};
    text-align: center;
    text-decoration: none;
    transition: opacity 0.2s ease-in-out;

    &:hover {
        opacity: 0.8;
    }
`;

const Login = () => {
    return (
        <Container>
            <LoginBox>
                <Title>소셜 로그인</Title>
                <Description>로그인할 소셜 계정을 선택해주세요.</Description>
                <ButtonContainer>
                    {providers.map((provider) => (
                        <LoginButton
                            key={provider.name}
                            href={`${BASE_URL}/oauth2/code/${provider.name}`}
                            color={provider.color}
                            provider={provider.name}
                        >
                            {provider.label}
                        </LoginButton>
                    ))}
                </ButtonContainer>
            </LoginBox>
        </Container>
    );
};

export default Login;
