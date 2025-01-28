import { BookshelfResponse } from "@/types"; // 타입을 types.ts에서 가져올 예정
import { useEffect, useState } from "react";
import bookshelfApi from "@/api/bookshelfApi";

interface BookshelfCardProps {
    bookshelf: BookshelfResponse;
    onClick?: () => void;
}

/**
 * 책장 정보를 표시하는 카드 컴포넌트
 */
const BookshelfCard = ({ bookshelf, onClick }: BookshelfCardProps) => {
    const [bookCount, setBookCount] = useState<number>(0);

    useEffect(() => {
        // 책장 상세 정보를 가져와서 책 개수를 업데이트
        const fetchBookshelfDetail = async () => {
            try {
                const response = await bookshelfApi.getBookshelfDetail(bookshelf.id);
                setBookCount(response.data.books.length);
            } catch (error) {
                console.error("책장 정보를 가져오는 중 오류 발생:", error);
            }
        };

        fetchBookshelfDetail();
    }, [bookshelf.id]);

    return (
        <div
            className="border rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg"
            onClick={onClick}
        >
            <img
                src={bookshelf.imageUrl || "/default-bookshelf.png"}
                alt={bookshelf.name}
                className="w-full h-40 object-cover rounded-md"
            />
            <div className="mt-2">
                <h3 className="font-semibold text-lg">{bookshelf.name}</h3>
                <p className="text-gray-600">{bookCount}권의 책</p>
            </div>
        </div>
    );
};

export default BookshelfCard;
