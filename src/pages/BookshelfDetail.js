import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { BookshelfContext } from "../context/BookshelfContext";
import Loading from "../components/Loading";

/**
 * 책장 상세 페이지
 * @returns {JSX.Element}
 */
const BookshelfDetail = () => {
    const { bookshelfId } = useParams();
    const { selectedBookshelf, fetchBookshelfDetail } = useContext(BookshelfContext);

    useEffect(() => {
        fetchBookshelfDetail(bookshelfId);
    }, [bookshelfId, fetchBookshelfDetail]);

    if (!selectedBookshelf) {
        return <Loading />;
    }

    return (
        <div>
            <h1>{selectedBookshelf.name}</h1>
            {selectedBookshelf.imageUrl && <img src={selectedBookshelf.imageUrl} alt="책장 이미지" />}
            <h2>책 목록</h2>
            <ul>
                {selectedBookshelf.books.length > 0 ? (
                    selectedBookshelf.books.map((book) => (
                        <li key={book.id}>
                            <p>{book.title} - {book.author}</p>
                        </li>
                    ))
                ) : (
                    <p>이 책장에 책이 없습니다.</p>
                )}
            </ul>
        </div>
    );
};

export default BookshelfDetail;
