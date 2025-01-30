import React, { useState } from "react";
import { searchBooks } from "../api/books";
import Input from "../components/Input";
import Button from "../components/Button";
import Loading from "../components/Loading";

/**
 * 책 검색 페이지
 * @returns {JSX.Element}
 */
const BookSearch = () => {
    const [query, setQuery] = useState("");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * 책 검색 핸들러
     */
    const handleSearch = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setError(null);
        try {
            const result = await searchBooks(query);
            setBooks(result);
        } catch (err) {
            setError("검색 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>책 검색</h1>
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="책 제목 입력" />
            <Button label="검색" onClick={handleSearch} />
            {loading && <Loading />}
            {error && <p>{error}</p>}
            <ul>
                {books.length > 0 ? (
                    books.map((book) => (
                        <li key={book.isbn}>
                            <p>{book.title} - {book.author}</p>
                            {book.thumbnail && <img src={book.thumbnail} alt={book.title} />}
                        </li>
                    ))
                ) : (
                    <p>검색 결과가 없습니다.</p>
                )}
            </ul>
        </div>
    );
};

export default BookSearch;
