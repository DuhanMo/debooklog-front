import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { BookshelfProvider } from "./context/BookshelfContext";
import AppRouter from "./routes/Router";

/**
 * 애플리케이션의 루트 컴포넌트
 * @returns {JSX.Element}
 */
const App = () => {
    return (
        <AuthProvider>
            <BookshelfProvider>
                <AppRouter />
            </BookshelfProvider>
        </AuthProvider>
    );
};

export default App;
