// src/App.jsx

import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import BookshelfDetail from './pages/BookshelfDetail';
import OAuth2Redirect from './pages/OAuth2Redirect';
import Login from './pages/Login';

const App = () => {
    return (
        <Router>
            <Navigation/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/bookshelves/:bookshelfId" element={<BookshelfDetail/>}/>
                <Route path="/oauth2/redirect" element={<OAuth2Redirect/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </Router>
    );
};

export default App;
