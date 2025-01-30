import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";

/**
 * 애플리케이션의 루트 컴포넌트
 * @returns {JSX.Element}
 */
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default App;

