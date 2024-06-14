import { Link } from "react-router-dom"
import { FaHome } from "react-icons/fa";


const Layout = ({ children }) => {
    return (
        <div>
            <header className="p-4 bg-transparent fixed top-0 left-0 w-full z-10 flex justify-between items-center">
                <Link to="/" className="text-lg font-bold text-blue-500 flex items-center">
                    <FaHome className="mr-2" />
                    Home
                </Link>
                <Link to="/login" className="text-lg font-bold text-blue-500">
                    <span>Login</span>
                </Link>
            </header>
            <main className="p-6">
                {children}
            </main>
        </div>
    )
}

export default Layout;
