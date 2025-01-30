import React from "react";

const BookshelfList = ({ bookshelves }) => {
    return (
        <div>
            <h2>책장 목록</h2>
            <ul>
                {bookshelves.map((bookshelf) => (
                    <li key={bookshelf.id}>
                        {bookshelf.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookshelfList;
