import logo from './logo.svg';
import './App.css';
import Layout from "./pages/Layout"
import Home from "./pages/Home";
import Login from "./pages/Login";
import BookshelfDetail from './pages/BookshelfDetail';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/bookshelves/:id" element={<BookshelfDetail />}></Route>
        <Route path="/login" element = {<Login/>}></Route>
      </Routes>
      </Layout>
    </Router>
  );
}

export default App;
