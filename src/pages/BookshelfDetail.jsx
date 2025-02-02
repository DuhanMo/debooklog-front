// src/pages/BookshelfDetail.jsx

import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";
import bookshelfService from "../services/bookshelfService";
import bookService from "../services/bookService";
import BookshelfEdit from "../components/BookshelfEdit";
import {getLoggedInMemberId} from "../utils/auth";

// 📌 스타일 정의
const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
    background: #f7f7f7;
    min-height: 100vh;
`;

const BookshelfCard = styled.div`
    background: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin-bottom: 20px;
`;

const BookshelfImage = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-top: 10px;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    color: #333;
`;

const Section = styled.div`
    background: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
`;

const BookList = styled.ul`
    list-style: none;
    padding: 0;
`;

const BookItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    border-bottom: 1px solid #eee;
    border: ${({isReading}) => (isReading ? "2px solid #4CAF50" : "1px solid transparent")}; /* ✅ 책 개별 테두리 변경 */
    border-radius: 8px;
    padding: 16px;
`;

const StateButton = styled.button`
    background: ${({isReading}) => (isReading ? "#0073e6" : "#4CAF50")}; /* ✅ "읽는 중"이면 초록색 */
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
    font-size: 14px;

    &:hover {
        background: ${({isReading}) => (isReading ? "#005bb5" : "#388E3C")};
    }
`;

const BookImage = styled.img`
    width: 80px;
    height: 100px;
    object-fit: cover;
    border-radius: 6px;
`;

const BookInfo = styled.div`
    flex: 1;
    margin-left: 16px;
`;

const BookTitle = styled.p`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 4px;
`;

const BookAuthor = styled.p`
    font-size: 14px;
    color: #666;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
`;

const LikeButton = styled.button`
    background: ${({liked}) => (liked ? "#ff4d4f" : "#ddd")};
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
    font-size: 14px;

    &:hover {
        background: ${({liked}) => (liked ? "#d9363e" : "#bbb")};
    }
`;

// 📌 책 상태를 한글로 변환하는 함수
const getBookStateLabel = (state) => {
    const stateMapping = {
        READING: "읽는 중",
        DONE: "독서 완료",
    };
    return stateMapping[state] || "상태 없음";
};

const BookshelfDetail = () => {
    const {bookshelfId} = useParams();
    const navigate = useNavigate();
    const [bookshelf, setBookshelf] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loggedInMemberId = getLoggedInMemberId();
    const isLoggedIn = !!loggedInMemberId;

    useEffect(() => {
        const fetchBookshelfDetail = async () => {
            try {
                const data = await bookshelfService.getBookshelfDetail(bookshelfId);
                setBookshelf(data.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookshelfDetail();
    }, [bookshelfId]);

    const handleChangeState = async (bookId, currentState) => {
        try {
            if (currentState === "READING") {
                await bookService.markBookAsDone(bookId);
            } else {
                await bookService.markBookAsReading(bookId);
            }

            setBookshelf((prev) => ({
                ...prev,
                books: prev.books.map((book) =>
                    book.id === bookId
                        ? {...book, state: currentState === "READING" ? "DONE" : "READING"}
                        : book
                ),
            }));
        } catch (err) {
            alert("상태 변경 중 오류가 발생했습니다.");
        }
    };

    const handleLikeToggle = async (book) => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }

        const isLiked = book.bookLikes.some((like) => like.memberId === loggedInMemberId);

        try {
            if (isLiked) {
                await bookService.cancelLikeBook(book.id);
            } else {
                await bookService.likeBook(book.id);
            }

            setBookshelf((prev) => ({
                ...prev,
                books: prev.books.map((b) =>
                    b.id === book.id
                        ? {
                            ...b,
                            likeCount: isLiked ? b.likeCount - 1 : b.likeCount + 1,
                            bookLikes: isLiked
                                ? b.bookLikes.filter((like) => like.memberId !== loggedInMemberId)
                                : [...b.bookLikes, {memberId: loggedInMemberId}],
                        }
                        : b
                ),
            }));
        } catch (err) {
            alert("좋아요 변경 중 오류가 발생했습니다.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error occurred: {error.message}</p>;
    if (!bookshelf) return <p>No bookshelf found.</p>;

    const isOwner = loggedInMemberId && loggedInMemberId === bookshelf.memberId;

    return (
        <Container>
            <BookshelfCard>
                <Title>{bookshelf.name}</Title>
                <BookshelfImage src={bookshelf.imageUrl || "/user.png"} alt={bookshelf.name} />
                {isOwner && <BookshelfEdit bookshelfId={bookshelf.id} currentName={bookshelf.name} />}
            </BookshelfCard>

            <Section>
                <h2>📚 책 목록</h2>
                <BookList>
                    {bookshelf.books.map((book) => {
                        const isLiked = book.bookLikes.some((like) => like.memberId === loggedInMemberId);
                        return (
                            <BookItem key={book.id} isReading={book.state === "READING"}>
                                <BookImage src={book.thumbnail || "/book.png"} alt={book.title} />
                                <BookInfo>
                                    <BookTitle>{book.title}</BookTitle>
                                    <BookAuthor>{book.author}</BookAuthor>
                                    <p>{getBookStateLabel(book.state)}</p>
                                </BookInfo>
                                <ButtonGroup>
                                    {/* 📌 ✅ 소유자만 상태 변경 버튼을 볼 수 있도록 조건 추가 */}
                                    {isOwner && (
                                        <StateButton
                                            isReading={book.state === "READING"}
                                            onClick={() => handleChangeState(book.id, book.state)}
                                        >
                                            {book.state === "READING" ? "독서 완료로 변경" : "읽는 중으로 변경"}
                                        </StateButton>
                                    )}
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                        <LikeButton liked={isLiked} onClick={() => handleLikeToggle(book)}>
                                            {isLiked ? "❤️" : "🤍"}
                                        </LikeButton>
                                        <span>{book.likeCount}</span> {/* 📌 ✅ 좋아요 개수 표시 */}
                                    </div>
                                </ButtonGroup>
                            </BookItem>
                        );
                    })}
                </BookList>
            </Section>
        </Container>
    );

};

export default BookshelfDetail;

