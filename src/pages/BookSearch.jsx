import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bookService from '../services/bookService';
import bookshelfService from '../services/bookshelfService';
import { getLoggedInMemberId } from '../utils/auth';

const BookSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [loadingRegister, setLoadingRegister] = useState(false);
    const [errorSearch, setErrorSearch] = useState(null);
    const navigate = useNavigate();

    // 책 검색 API 호출
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoadingSearch(true);
        setErrorSearch(null);
        try {
            const data = await bookService.searchBooks(query);
            // 응답 구조: { message, data: BookInformationResponse[] }
            setResults(data.data);
        } catch (error) {
            setErrorSearch(error);
            // 검색 에러도 alert로 노출할 수 있습니다.
            alert(error.message);
        } finally {
            setLoadingSearch(false);
        }
    };

    // 책 등록 API 호출 후, 등록 성공 시 내 책장 상세 페이지로 이동
    const handleRegister = async (book) => {
        setLoadingRegister(true);
        try {
            await bookService.registerBook(book);
            // 등록 성공 후, 내 책장 상세 페이지로 이동하기 위한 로직
            const memberId = getLoggedInMemberId();
            if (!memberId) {
                // 401 응답 시 Axios 인터셉터가 처리하겠지만, 혹시 모를 경우
                navigate('/login');
                return;
            }
            // 내 책장을 찾기 위해 전체 책장 목록 호출
            const bookshelfData = await bookshelfService.getBookshelves();
            const myBookshelf = bookshelfData.data.find(
                (shelf) => shelf.memberId === memberId
            );
            if (myBookshelf) {
                navigate(`/bookshelves/${myBookshelf.id}`);
            } else {
                navigate('/');
            }
        } catch (error) {
            // error.response.data.message가 존재하면 해당 메시지를 alert로 표시
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
        <div>
            <h1>Book Search</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter book title"
                />
                <button type="submit" disabled={loadingSearch}>
                    {loadingSearch ? 'Searching...' : 'Search'}
                </button>
            </form>
            {errorSearch && (
                <p style={{ color: 'red' }}>Error: {errorSearch.message}</p>
            )}
            <div>
                {results.length > 0 ? (
                    <ul>
                        {results.map((book, index) => (
                            <li key={index}>
                                <p>
                                    {book.title} by {book.author}
                                </p>
                                <img
                                    src={book.thumbnail || '/book.png'}
                                    alt={book.title}
                                />
                                <button
                                    onClick={() => handleRegister(book)}
                                    disabled={loadingRegister}
                                >
                                    {loadingRegister ? 'Registering...' : 'Register Book'}
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    );
};

export default BookSearch;
