import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom"


const ErrorPage = ({message}) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-background px-5 sm:px-8">
            <div className="bg-surface border border-border rounded-xl shadow-sm p-8 sm:p-10 max-w-md w-full text-center">

                {/* icon */}
                <div className="flex justify-center mb-5">
                    <div className="bg-red-50 text-red-500 p-4 rounded-full">
                        <FaExclamationTriangle className="text-3xl"/>
                    </div>
                </div>

                {/* heading */}
                <h1 className="text-2xl sm:text-3xl font-bold text-textMain mb-2">
                    Oops! Something went wrong
                </h1>

                {/* message */}
                <p className="text-textSecondary mb-6 leading-relaxed text-sm sm:text-base">
                    {message || "An unexpected error has been occurred. Please try again."}
                </p>

                {/* button */}
                <button
                    onClick={() => navigate("/")}
                    className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                    >
                        Go back to home
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;