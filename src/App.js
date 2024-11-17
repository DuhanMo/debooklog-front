import './App.css';
import Layout from "./pages/Layout"
import Home from "./pages/Home";
import Login from "./pages/Login";
import BookshelfDetail from './pages/BookshelfDetail';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Provider} from 'react-redux';
import {store} from './store/store';

function App() {
    return (<Provider store={store}>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home/>}></Route>
                        <Route path="/bookshelves/:id" element={<BookshelfDetail/>}></Route>
                        <Route path="/login" element={<Login/>}></Route>
                    </Routes>
                </Layout>
            </Router>
        </Provider>);
}

export default App;
