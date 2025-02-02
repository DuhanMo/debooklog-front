import React from 'react';
import BookRank from '../components/BookRank';
import BookshelfList from '../components/BookshelfList';

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <BookRank />
            <BookshelfList />
        </div>
    );
};

export default Home;
