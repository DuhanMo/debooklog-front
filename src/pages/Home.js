import React, { useContext } from "react";
import { BookshelfContext } from "../context/BookshelfContext";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const Home = () => {
    const { bookshelves, fetchBookshelves } = useContext(BookshelfContext);

    if (!bookshelves) {
        return <Loading />;
    }

    return (
        <div>
            <h1>책장 목록</h1>
            <button onClick={fetchBookshelves}>새로고침</button>
            <ul>
                {bookshelves.length > 0 ? (
                    bookshelves.map((shelf) => (
                        <li key={shelf.id}>
                            <Link to={`/bookshelves/${shelf.id}`}>{shelf.name}</Link>
                        </li>
                    ))
                ) : (
                    <p>책장이 없습니다.</p>
                )}
            </ul>
        </div>
    );
};

export default Home;
