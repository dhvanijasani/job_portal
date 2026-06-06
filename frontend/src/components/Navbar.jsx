import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav className="bg-slate-900 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">

                <Link
                    to="/"
                    className="text-2xl font-bold text-blue-400"
                >
                    Job Portal
                </Link>

                <div className="flex items-center gap-6">

                    <Link
                        to="/"
                        className="hover:text-blue-400"
                    >
                        Jobs
                    </Link>

                    {token && (
                        <>
                            <Link
                                to="/my-applications"
                                className="hover:text-blue-400"
                            >
                                My Applications
                            </Link>
                            <Link
                                to="/add-job"
                                className="hover:text-blue-400"
                            >
                                Add Job
                            </Link>

                            <span className="text-gray-300">
                                {user?.name}
                            </span>

                            <button
                                onClick={logout}
                                className="bg-red-500 px-4 py-2 rounded"
                            >
                                Logout
                            </button>
                        </>
                    )}

                    {!token && (
                        <>
                            <Link
                                to="/login"
                                className="hover:text-blue-400"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="bg-blue-600 px-4 py-2 rounded"
                            >
                                Register
                            </Link>
                        </>
                    )}

                </div>
            </div>
        </nav>
    );
};

export default Navbar;