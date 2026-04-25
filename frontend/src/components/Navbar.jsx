import { Link, useLocation, useNavigate } from "react-router-dom"
import { useStoreContext } from "../contextApi/ContextApi";
import { useState } from "react";
import {IoIosMenu} from "react-icons/io";
import {RxCross2} from "react-icons/rx";

const Navbar = () => {
    const navigate = useNavigate();
    const {token, setToken} = useStoreContext();
    const path = useLocation().pathname;
    const [navbarOpen, setNavbarOpen] = useState(false);

    const onLogOutHandler = () => {
        setToken(null);
        localStorage.removeItem("JWT_TOKEN");
        navigate("/login");
    };

    const navLinkStyle = (route) =>
        `text-sm font-medium transition ${
        path === route
            ? "text-primary"
            : "text-textSecondary hover:text-primary"
    }`;

    return (
        <nav className="h-16 bg-surface border-b border-border sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-14 h-full flex items-center justify-between">

                <Link to="/">
                    <h1 className="text-2xl sm:text-3xl font-bold text-primary">
                        Shortiq
                    </h1>
                </Link>
                
                {/* for desktop */}
                <ul className="hidden sm:flex items-center gap-8">
                    <li>
                        <Link to="/" className={navLinkStyle("/")}>
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link to="/about" className={navLinkStyle("/about")}>
                            About
                        </Link>
                    </li>

                    {token && (
                        <li>
                            <Link to="/dashboard" className={navLinkStyle("/dashboard")}>
                                Dashboard
                            </Link>
                        </li>
                    )}

                    {!token ? (
                        <Link to="/register" className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm transition"
                        >
                            Sign Up
                        </Link>
                    ) : (
                        <button onClick={onLogOutHandler} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition">
                            Logout
                        </button>
                    )}
                </ul>

                {/* mobile button */}
                <button
                    onClick={() => setNavbarOpen(!navbarOpen)}
                    className="sm:hidden text-textMain text-3xl">
                        {navbarOpen ? <RxCross2/> : <IoIosMenu/>}
                </button>
            </div>

            {/* for phones */}
            {navbarOpen && (
                <div className="sm:hidden bg-surface border-t border-border px-5 py-4 flex flex-col gap-4">
                    <Link
                        to="/"
                        onClick={() => setNavbarOpen(false)}
                        className={navLinkStyle("/")}
                    >
                        Home
                    </Link>

                    <Link
                        to="/about"
                        onClick={() => setNavbarOpen(false)}
                        className={navLinkStyle("/about")}
                    >
                        About
                    </Link>

                    {token && (
                        <Link
                        to="/dashboard"
                        onClick={() => setNavbarOpen(false)}
                        className={navLinkStyle("/dashboard")}
                        >
                        Dashboard
                        </Link>
                    )}

                    {!token ? (
                        <Link
                            to="/register"
                            onClick={() => setNavbarOpen(false)}
                            className="bg-primary text-white px-4 py-2 rounded-lg text-center"
                        >
                            Sign Up
                        </Link>
                    ) : (
                        <button
                            onClick={() => {
                                onLogOutHandler();
                                setNavbarOpen(false);
                            }}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                            >
                                Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;