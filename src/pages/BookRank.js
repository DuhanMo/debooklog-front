import React, { useEffect, useState } from "react";
import { getBookRanks } from "../services/bookService";
import Loading from "../components/Loading";

/**
 * 인기 책 랭킹 페이지
 * @returns {JSX.Element}
 */
const BookRank = () => {
    const [ranks, setRanks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * 책 랭킹 데이터를 가져오는 함수
     */
    const fetchBookRanks = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getBookRanks();
            setRanks(response);
        } catch (err) {
            setError("책 랭킹 데이터를 불러오는 데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookRanks();
    }, []);

    return (
        <div>
            <h1>인기 책 랭킹</h1>
            {loading && <Loading />}
            {error && <p>{error}</p>}
            <ul>
                {ranks.length > 0 ? (
                    ranks.map((book, index) => (
                        <li key={index}>
                            <p>#{book.rank} - {book.bookTitle} (ISBN: {book.isbn})</p>
                            <p>언급 횟수: {book.count}</p>
                        </li>
                    ))
                ) : (
                    <p>랭킹 정보가 없습니다.</p>
                )}
            </ul>
        </div>
    );
};

export default BookRank;
