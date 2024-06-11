import logo from './logo.svg';
import './App.css';
import Home from "./pages/Home";
import BookshelfDetail from './pages/BookshelfDetail';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/bookshelves/:id" element={<BookshelfDetail />}></Route>
        </Routes>
      </Router>
  );
}

export default App;
