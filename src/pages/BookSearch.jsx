import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import bookService from "../services/bookService";
import bookshelfService from "../services/bookshelfService";
import { getLoggedInMemberId } from "../utils/auth";

// 📌 컨테이너 스타일
const Container = styled.div`
    max-width: 800px;
    padding: 40px 20px;
    background: #f7f7f7;
    min-height: 100vh;
`;

// 📌 검색 입력창과 버튼 스타일
const SearchForm = styled.form`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
`;

const SearchInput = styled.input`
    flex: 1;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-family: inherit;
`;

const SearchButton = styled.button`
    background: #0073e6;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 6px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s ease-in-out;

    &:hover {
        background: #005bb5;
    }

    &:disabled {
        background: #ccc;
        cursor: not-allowed;
    }
`;

// 📌 결과 목록 스타일
const ResultsList = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

// 📌 개별 책 카드 스타일
const BookCard = styled.li`
    display: flex;
    align-items: center;
    background: white;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
`;

const BookAuthor = styled.p`
    font-size: 14px;
    color: #666;
`;

const RegisterButton = styled.button`
    background: #ff4d4f;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s ease-in-out;

    &:hover {
        background: #d9363e;
    }

    &:disabled {
        background: #ccc;
        cursor: not-allowed;
    }
`;

// 📌 에러 메시지 스타일
const ErrorMessage = styled.p`
    color: red;
    font-weight: bold;
    margin-top: 10px;
`;

const BookSearch = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [loadingRegister, setLoadingRegister] = useState(false);
    const [errorSearch, setErrorSearch] = useState(null);
    const navigate = useNavigate();

    // 📌 책 검색 API 호출
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoadingSearch(true);
        setErrorSearch(null);
        try {
            const data = await bookService.searchBooks(query);
            setResults(data.data);
        } catch (error) {
            setErrorSearch(error);
            alert(error.message);
        } finally {
            setLoadingSearch(false);
        }
    };

    // 📌 책 등록 API 호출 후 내 책장으로 이동
    const handleRegister = async (book) => {
        setLoadingRegister(true);
        try {
            await bookService.registerBook(book);
            const memberId = getLoggedInMemberId();
            if (!memberId) {
                navigate("/login");
                return;
            }
            const bookshelfData = await bookshelfService.getBookshelves();
            const myBookshelf = bookshelfData.data.find((shelf) => shelf.memberId === memberId);
            if (myBookshelf) {
                navigate(`/bookshelves/${myBookshelf.id}`);
            } else {
                navigate("/");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert(error.message);
            }
        } finally {
            setLoadingRegister(false);
        }
    };

    return (
        <Container>
            <h1>📚 도서 검색</h1>
            <SearchForm onSubmit={handleSearch}>
                <SearchInput
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="책 제목을 입력하세요"
                />
                <SearchButton type="submit" disabled={loadingSearch}>
                    {loadingSearch ? "검색 중..." : "검색"}
                </SearchButton>
            </SearchForm>

            {errorSearch && <ErrorMessage>에러 발생: {errorSearch.message}</ErrorMessage>}

            {results.length > 0 ? (
                <ResultsList>
                    {results.map((book, index) => (
                        <BookCard key={index}>
                            <BookImage src={book.thumbnail || "/book.png"} alt={book.title} />
                            <BookInfo>
                                <BookTitle>{book.title}</BookTitle>
                                <BookAuthor>{book.author}</BookAuthor>
                            </BookInfo>
                            <RegisterButton onClick={() => handleRegister(book)} disabled={loadingRegister}>
                                {loadingRegister ? "등록 중..." : "책 등록"}
                            </RegisterButton>
                        </BookCard>
                    ))}
                </ResultsList>
            ) : (
                <p>검색 결과가 없습니다.</p>
            )}
        </Container>
    );
};

export default BookSearch;
