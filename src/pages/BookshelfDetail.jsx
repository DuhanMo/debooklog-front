import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import bookshelfService from '../services/bookshelfService';
import BookshelfEdit from '../components/BookshelfEdit';
import {getLoggedInMemberId} from "../utils/auth";
import bookService from '../services/bookService';

const getBookStateLabel = (state) => {
    const stateMapping = {
        READING: '읽는 중',
        DONE: '독서 완료',
    };
    return stateMapping[state] || '상태 없음';
};

const BookshelfDetail = () => {
    const { bookshelfId } = useParams();
    const [bookshelf, setBookshelf] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 로그인된 사용자의 식별자
    const loggedInMemberId = getLoggedInMemberId();

    useEffect(() => {
        const fetchBookshelfDetail = async () => {
            try {
                const data = await bookshelfService.getBookshelfDetail(bookshelfId);
                setBookshelf(data.data); // API 응답의 data 필드가 BookshelfDetailResponse 객체여야 함
            } catch (error) {
                setError(error);
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

    // 책 상태 변경 함수
    const handleChangeState = async (bookId, currentState) => {
        try {
            if (currentState === 'READING') {
                await bookService.markBookAsDone(bookId);
            } else {
                await bookService.markBookAsReading(bookId);
            }

            // 상태 변경 후, 책 목록을 업데이트
            setBookshelf((prev) => ({
                ...prev,
                books: prev.books.map((book) =>
                    book.id === bookId
                        ? { ...book, state: currentState === 'READING' ? 'DONE' : 'READING' }
                        : book
                ),
            }));
        } catch (err) {
            alert('상태 변경 중 오류가 발생했습니다.');
        }
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
                style={{ width: '150px', height: 'auto' }}
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
                            <img src={book.thumbnail || '/book.png'} alt={book.title}
                                 style={{width: '100px', height: 'auto'}}/>
                            <p>좋아요: {book.likeCount}</p>
                            <p>상태: {getBookStateLabel(book.state)}</p>
                            {/* 본인 책장일 경우 상태 변경 버튼 노출 */}
                            {isOwner && (
                                <button onClick={() => handleChangeState(book.id, book.state)}>
                                    {book.state === 'READING' ? '독서 완료로 변경' : '읽는 중으로 변경'}
                                </button>
                            )}
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
