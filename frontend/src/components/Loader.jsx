import { RotatingLines } from "react-loader-spinner";


function Loader({fullScreen = false}) {
    return (
        <div
            className={`flex flex-col items-center justify-center gap-3 ${
                fullScreen ? "min-h-[calc(100vh-64px)]" : "h-[300px]"
                }`}
            >
                <RotatingLines
                    visible={true}
                    height="50"
                    width="50"
                    color="#2563EB"
                    strokeWidth="4"
                    animationDuration="0.75"
                    ariaLabel="loading"
                />

                <p className="text-textSecondary text-sm">Loading, please wait...</p>
        </div>
    );
};

export default Loader;