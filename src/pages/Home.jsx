import React from "react";
import styled from "styled-components";
import BookRank from "../components/BookRank";
import BookshelfList from "../components/BookshelfList";

// 📌 메인 컨테이너
const Container = styled.div`
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 20px;
    background: #f7f7f7;
    min-height: 100vh;
`;

// 📌 섹션 스타일
const Section = styled.div`
    background: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
`;

const Home = () => {
    return (
        <Container>
            <Section>
                <BookRank />
            </Section>

            <Section>
                <BookshelfList />
            </Section>
        </Container>
    );
};

export default Home;
