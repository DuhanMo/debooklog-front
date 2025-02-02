import React, { useState, useEffect } from "react";
import styled from "styled-components";
import bookService from "../services/bookService";

// 📌 컨테이너 스타일
const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

// 📌 랭킹 리스트 스타일
const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    border-radius: 12px;
    background: white;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

// 📌 리스트 아이템 스타일
const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #eee;
    font-size: 16px;
    color: #333;

    &:last-child {
        border-bottom: none;
    }
`;

// 📌 제목 스타일
const RankTitle = styled.h1`
    font-size: 20px;
    font-weight: bold;
    color: #222;
`;

const BookRank = () => {
    const [ranks, setRanks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRanks = async () => {
            try {
                const rankData = await bookService.getBookRanks();
                setRanks(rankData.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRanks();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Container>
            <RankTitle>🏆 인기 책 랭킹</RankTitle>
            <List>
                {ranks.map((book) => (
                    <ListItem key={book.isbn}>
                        <span>#{book.rank} {book.bookTitle}</span>
                        <span>{book.count}명이 읽음</span>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default BookRank;
