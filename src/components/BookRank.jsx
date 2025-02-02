import React, { useState, useEffect } from 'react';
import bookService from '../services/bookService';

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
        <div>
            <h1>Book Ranks</h1>
            <ul>
                {ranks.length > 0 ? (
                    ranks.map((book) => (
                        <li key={book.isbn}>
                            <p>
                                <strong>#{book.rank}</strong> {book.bookTitle} ({book.count}명이 읽음)
                            </p>
                        </li>
                    ))
                ) : (
                    <p>No ranking data available.</p>
                )}
            </ul>
        </div>
    );
};

export default BookRank;
