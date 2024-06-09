import { useEffect, useState } from "react";
import { fetchBookshelves } from "../services/api";

const Home = () => {
    const [bookshelves, setBookshelves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBookshelves = async () => {
            try {
                const data = await fetchBookshelves();
                setBookshelves(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        loadBookshelves();
    }, []);
    if (loading) {
        return <div className="text-center text-gray-500">Loading...</div>
    }
    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>
    }
    return (
        <div className="home-page p-6">
            <h1 className="text-3xl font-bold mb-4 text-center">책장</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-auto">
                {bookshelves.map((bookshelf) => (
                    <BookshelfCard
                        key={bookshelf.id}
                        name={bookshelf.name}
                        imageUrl={bookshelf.imageUrl}
                    />
                ))}
            </div>
        </div>
    );
};

const BookshelfCard = ({ name, imageUrl }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-2 w-40">
            <img src={imageUrl} alt={name} className="w-full h-40 object-cover rounded-md" />
            <h2 className="text-lg font-medium mt-1 mx-auto">{name}</h2>
        </div>
    );
};
export default Home;