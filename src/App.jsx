import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* 추가 라우트가 있을 경우 이곳에 등록 */}
            </Routes>
        </Router>
    );
};

export default App;
