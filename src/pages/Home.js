import React, { useEffect, useState } from "react";
import { getBookshelves } from "../services/bookshelfService";
import BookshelfList from "../components/BookshelfList";

const Home = () => {
    const [bookshelves, setBookshelves] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookshelves = async () => {
            try {
                const data = await getBookshelves();
                setBookshelves(data);
            } catch (error) {
                console.error("책장 목록을 불러오는 중 오류 발생:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookshelves();
    }, []);

    return (
        <div>
            <h1>홈 화면</h1>
            {loading ? <p>로딩 중...</p> : <BookshelfList bookshelves={bookshelves} />}
        </div>
    );
};

export default Home;
