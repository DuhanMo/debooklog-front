import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookshelfList from './components/BookshelfList';
import Login from "./components/Login";
import OAuth2RedirectHandler from "./components/OAuth2RedirectHandler";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<BookshelfList/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
            </Routes>
        </Router>
    );
};

export default App;
