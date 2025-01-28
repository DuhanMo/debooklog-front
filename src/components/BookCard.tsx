import { BookResponse } from "@/types"; // 타입을 types.ts에서 가져올 예정
import { useState } from "react";
import bookApi from "@/api/bookApi";
import Button from "./Button";

interface BookCardProps {
    book: BookResponse;
    onClick?: () => void;
}

/**
 * 책 정보를 표시하는 카드 컴포넌트
 */
const BookCard = ({ book, onClick }: BookCardProps) => {
    const [liked, setLiked] = useState(false);

    const toggleLike = async () => {
        try {
            if (liked) {
                await bookApi.cancelLike(book.id);
            } else {
                await bookApi.createLike(book.id);
            }
            setLiked(!liked);
        } catch (error) {
            console.error("좋아요 처리 중 오류 발생:", error);
        }
    };

    return (
        <div
            className="border rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg"
            onClick={onClick}
        >
            <img src={book.thumbnail} alt={book.title} className="w-full h-40 object-cover rounded-md" />
            <div className="mt-2">
                <h3 className="font-semibold text-lg">{book.title}</h3>
                <p className="text-gray-600">{book.author}</p>
            </div>
            <Button
                className={`mt-2 w-full ${liked ? "bg-red-500" : "bg-gray-300"}`}
                onClick={(e) => {
                    e.stopPropagation();
                    toggleLike();
                }}
            >
                {liked ? "❤️ 좋아요 취소" : "🤍 좋아요"}
            </Button>
        </div>
    );
};

export default BookCard;
