import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {fetchBookshelves} from "../services/api";

const Home = () => {
    const [bookshelves, setBookshelves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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

    const handleCardClick = (bookshelfId) => {
        navigate(`/bookshelves/${bookshelfId}`);
    };

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
                    <div className="flex justify-center">
                        <BookshelfCard
                            key={bookshelf.id}
                            name={bookshelf.name}
                            imageUrl={bookshelf.imageUrl}
                            onClick={() => handleCardClick(bookshelf.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

const BookshelfCard = ({ name, imageUrl, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="bg-white shadow-md rounded-lg p-2 w-40 cursor-pointer transform hover:scale-105 transition-transform duration-300">
            <img src={imageUrl} alt={name} className="w-full h-40 object-cover rounded-md" />
            <h2 className="text-lg font-medium mt-1 mx-auto">{name}</h2>
        </div>
    );
};
export default Home;
