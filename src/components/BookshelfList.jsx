import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import bookshelfService from "../services/bookshelfService";

// 📌 컨테이너 스타일
const Container = styled.div`
    margin-top: 20px;
`;

// 📌 2열 고정 그리드 스타일
const Grid = styled.ul`
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* ✅ 모든 화면에서 2열 고정 */
    gap: 24px;
    padding: 0;
    list-style: none;
`;

// 📌 개별 카드 스타일
const BookshelfCard = styled(Link)`
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.2s ease-in-out;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    cursor: pointer;

    &:hover {
        transform: translateY(-5px);
    }
`;

// 📌 이미지 스타일
const Image = styled.img`
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
`;

// 📌 책장 제목 스타일
const BookshelfName = styled.div`
    font-size: 18px;
    font-weight: 600;
    color: #333;
    padding: 16px;
    text-align: center;
`;

const BookshelfList = () => {
    const [bookshelves, setBookshelves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookshelves = async () => {
            try {
                const data = await bookshelfService.getBookshelves();
                setBookshelves(data.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookshelves();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error occurred: {error.message}</p>;

    return (
        <Container>
            <Grid>
                {bookshelves.map((bookshelf) => (
                    <BookshelfCard key={bookshelf.id} to={`/bookshelves/${bookshelf.id}`}>
                        <Image src={bookshelf.imageUrl || "/user.png"} alt={bookshelf.name} />
                        <BookshelfName>{bookshelf.name}</BookshelfName>
                    </BookshelfCard>
                ))}
            </Grid>
        </Container>
    );
};

export default BookshelfList;
