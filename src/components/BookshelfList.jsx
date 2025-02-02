import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bookshelfService from '../services/bookshelfService';

const BookshelfList = () => {
    const [bookshelves, setBookshelves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookshelves = async () => {
            try {
                const data = await bookshelfService.getBookshelves();
                setBookshelves(data.data); // data.data: 책장 목록 배열
            } catch (error) {
                setError(error);
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
                        {/* 책장 이름을 클릭 시 상세 페이지로 이동 */}
                        <Link to={`/bookshelves/${bookshelf.id}`}>
                            {bookshelf.name}
                        </Link>
                        <br />
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
