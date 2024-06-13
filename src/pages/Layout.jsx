import { Link } from "react-router-dom"
import { FaHome } from "react-icons/fa";

const Layout = ({ children }) => {
    return (
        <div>
            <header className="p-4 fixed top-4 left-4">
                <Link to="/" className="text-2xl text-blue-500">
                    <FaHome />
                </Link>
            </header>
            <main className="p-6">
                {children}
            </main>
        </div>
    )
}

export default Layout;
