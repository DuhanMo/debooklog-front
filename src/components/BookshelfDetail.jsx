import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import bookshelfService from '../services/bookshelfService';

const BookshelfDetail = () => {
    // URL 파라미터에서 bookshelfId 추출
    const { bookshelfId } = useParams();
    const [bookshelf, setBookshelf] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookshelfDetail = async () => {
            try {
                const data = await bookshelfService.getBookshelfDetail(bookshelfId);
                setBookshelf(data.data); // data.data: BookshelfDetailResponse 객체
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookshelfDetail();
    }, [bookshelfId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error occurred: {error.message}</p>;
    if (!bookshelf) return <p>No bookshelf found.</p>;

    return (
        <div>
            <h1>{bookshelf.name}</h1>
            <p>Member ID: {bookshelf.memberId}</p>
            <img
                src={bookshelf.imageUrl || '/user.png'}
                alt={bookshelf.name}
                style={{ width: '150px', height: 'auto' }}
            />

            <h2>Books</h2>
            {bookshelf.books && bookshelf.books.length > 0 ? (
                <ul>
                    {bookshelf.books.map((book) => (
                        <li key={book.id}>
                            {book.title} by {book.author}
                            <br />
                            <img
                                src={book.thumbnail}
                                alt={book.title}
                                style={{ width: '100px', height: 'auto' }}
                            />
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
