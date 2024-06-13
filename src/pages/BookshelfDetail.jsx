import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookshelfById } from "../services/api";

const BookshelfDetail = () => {
    const { id } = useParams();
    const [bookshelf, setBookshelf] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBookshelf = async () => {
            try {
                const data = await fetchBookshelfById(id);
                setBookshelf(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        loadBookshelf();
    }, [id]);

    if (loading) {
        return <div className="text-center text-gray-500">Loading books...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    if (!bookshelf) {
        return <div className="text-center text-gray-500">책장이 비어 있습니다.</div>;
    }

    return (
        <div className="bookshelf-detail-page p-6">
            <h1 className="text-3xl font-bold mb-4 text-center">{bookshelf.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookshelf.books.length > 0 ? (
                    bookshelf.books.map((book) => (
                        <div key={book.id} className="bg-white shadow-md rounded-lg p-4">
                            <img src={book.thumbnail} alt={book.title} className="w-full h-40 object-cover rounded-md" />
                            <h3 className="text-lg font-medium mt-2">{book.title}</h3>
                            <p className="text-sm text-gray-600">저자: {book.author}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">책장이 비어 있습니다.</p>
                )}
            </div>
        </div>
    );
};

export default BookshelfDetail;
