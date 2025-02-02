import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import bookshelfService from '../services/bookshelfService';
import bookService from '../services/bookService';
import BookshelfEdit from '../components/BookshelfEdit';
import { getLoggedInMemberId } from '../utils/auth';

// 책 상태를 한글로 변환하는 함수
const getBookStateLabel = (state) => {
    const stateMapping = {
        READING: '읽는 중',
        DONE: '독서 완료',
    };
    return stateMapping[state] || '상태 없음';
};

const BookshelfDetail = () => {
    const { bookshelfId } = useParams();
    const navigate = useNavigate();
    const [bookshelf, setBookshelf] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loggedInMemberId = getLoggedInMemberId();
    const isLoggedIn = !!loggedInMemberId; // 로그인 여부 확인

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

            // UI 업데이트
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

    // 책 좋아요 추가/취소 함수
    const handleLikeToggle = async (book) => {
        if (!isLoggedIn) {
            navigate('/login'); // 비로그인 상태에서는 로그인 페이지로 이동
            return;
        }

        const isLiked = book.bookLikes.some((like) => like.memberId === loggedInMemberId);

        try {
            if (isLiked) {
                await bookService.cancelLikeBook(book.id);
            } else {
                await bookService.likeBook(book.id);
            }

            // UI 업데이트: 좋아요 상태 및 개수 변경
            setBookshelf((prev) => ({
                ...prev,
                books: prev.books.map((b) =>
                    b.id === book.id
                        ? {
                            ...b,
                            likeCount: isLiked ? b.likeCount - 1 : b.likeCount + 1,
                            bookLikes: isLiked
                                ? b.bookLikes.filter((like) => like.memberId !== loggedInMemberId)
                                : [...b.bookLikes, { memberId: loggedInMemberId }],
                        }
                        : b
                ),
            }));
        } catch (err) {
            alert('좋아요 변경 중 오류가 발생했습니다.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error occurred: {error.message}</p>;
    if (!bookshelf) return <p>No bookshelf found.</p>;

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
                    {bookshelf.books.map((book) => {
                        const isLiked = book.bookLikes.some((like) => like.memberId === loggedInMemberId);
                        return (
                            <li key={book.id}>
                                <p>
                                    {book.title} by {book.author}
                                </p>
                                <img src={book.thumbnail || '/book.png'} alt={book.title} />
                                <p>Like Count: {book.likeCount}</p>
                                <p>State: {getBookStateLabel(book.state)}</p>

                                {/* 책 상태 변경 버튼 (본인 책장만) */}
                                {isOwner && (
                                    <button onClick={() => handleChangeState(book.id, book.state)}>
                                        {book.state === 'READING' ? '독서 완료로 변경' : '읽는 중으로 변경'}
                                    </button>
                                )}

                                {/* 좋아요 버튼 */}
                                <button onClick={() => handleLikeToggle(book)}>
                                    {isLiked ? '❤️' : '🤍'}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>No books available in this bookshelf.</p>
            )}
        </div>
    );
};

export default BookshelfDetail;
