import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookshelfDetail from './components/BookshelfDetail';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bookshelves/:bookshelfId" element={<BookshelfDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
