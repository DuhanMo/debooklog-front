import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import bookshelfService from '../services/bookshelfService';
import BookshelfEdit from '../components/BookshelfEdit';

/**
 * JWT 토큰의 payload에서 subject(회원 식별자)를 추출하는 함수.
 * 실제 환경에서는 안정적인 라이브러리를 사용하는 것을 권장합니다.
 */
const getLoggedInMemberId = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;
    try {
        // JWT의 payload 부분(Base64로 인코딩된 부분)을 디코딩합니다.
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        return Number(payload.sub);
    } catch (error) {
        console.error('Token parsing error:', error);
        return null;
    }
};

const BookshelfDetail = () => {
    const { bookshelfId } = useParams();
    const [bookshelf, setBookshelf] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 로그인된 사용자의 식별자 (숫자)
    const loggedInMemberId = getLoggedInMemberId();

    useEffect(() => {
        const fetchBookshelfDetail = async () => {
            try {
                const data = await bookshelfService.getBookshelfDetail(bookshelfId);
                setBookshelf(data.data); // API 응답의 data 필드가 BookshelfDetailResponse 객체여야 함
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBookshelfDetail();
    }, [bookshelfId]);

    // API 호출 후 책장명이 수정되었을 때 상태를 업데이트하는 함수
    const handleUpdate = (updatedName) => {
        setBookshelf((prev) => ({ ...prev, name: updatedName }));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error occurred: {error.message}</p>;
    if (!bookshelf) return <p>No bookshelf found.</p>;

    // 소유자 여부 확인: 로그인된 사용자의 ID와 책장의 memberId가 일치하는지 확인
    const isOwner = loggedInMemberId && loggedInMemberId === bookshelf.memberId;

    return (
        <div>
            <h1>{bookshelf.name}</h1>
            <p>Member ID: {bookshelf.memberId}</p>
            <img
                src={bookshelf.imageUrl || '/user.png'}
                alt={bookshelf.name}
                style={{ width: '100px', height: 'auto' }}
            />

            {/* 소유자인 경우에만 책장 이름 수정 폼을 표시 */}
            {isOwner && (
                <div>
                    <h3>Edit Bookshelf Name</h3>
                    <BookshelfEdit
                        bookshelfId={bookshelf.id}
                        currentName={bookshelf.name}
                        onUpdate={handleUpdate}
                    />
                </div>
            )}

            <h2>Books</h2>
            {bookshelf.books && bookshelf.books.length > 0 ? (
                <ul>
                    {bookshelf.books.map((book) => (
                        <li key={book.id}>
                            <p>{book.title} by {book.author}</p>
                            <img src={book.thumbnail} alt={book.title} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No books available in this bookshelf.</p>
            )}
        </div>
    );
};

export default BookshelfDetail;
