import React, { useState, useEffect } from 'react';
import bookshelfService from '../services/bookshelfService';

const BookshelfList = () => {
    const [bookshelves, setBookshelves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookshelves = async () => {
            try {
                const data = await bookshelfService.getBookshelves();
                setBookshelves(data.data); // API 응답 구조: { message: string, data: BookshelfResponse[] }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookshelves();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error occurred: {error.message}</p>;

    return (
        <div>
            <h2>Bookshelves</h2>
            <ul>
                {bookshelves.map((bookshelf) => (
                    <li key={bookshelf.id}>
                        {bookshelf.name}
                        <img
                            src={bookshelf.imageUrl || '/user.png'}
                            alt={bookshelf.name}
                            style={{ width: '100px', height: 'auto' }}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookshelfList;
