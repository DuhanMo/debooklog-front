import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import BookshelfDetail from './pages/BookshelfDetail';
import OAuth2Redirect from './pages/OAuth2Redirect';
import Login from './pages/Login';
import BookSearch from './pages/BookSearch';

const App = () => {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bookshelves/:bookshelfId" element={<BookshelfDetail />} />
                <Route path="/oauth2/redirect" element={<OAuth2Redirect />} />
                <Route path="/login" element={<Login />} />
                <Route path="/search" element={<BookSearch />} />
            </Routes>
        </Router>
    );
};

export default App;
