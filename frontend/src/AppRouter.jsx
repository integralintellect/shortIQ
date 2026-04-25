import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import ShortenUrlPage from "./components/ShortenUrlPage";
import PrivateRoute from "./PrivateRoute";
import RegisterPage from "./components/RegisterPage";
import ErrorPage from "./components/ErrorPage";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import DashboardLayout from "./components/dashboard/DashboardLayout";


const AppRouter = () => {
    const hideHeaderFooter = location.pathname.startsWith("/s");

    return (
        <>
            {!hideHeaderFooter && <Navbar/>}
            <Toaster position="bottom-center"/>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/s/:url" element={<ShortenUrlPage />} />

                <Route path="/register" element={<PrivateRoute publicPage={true}><RegisterPage /></PrivateRoute>} />
                <Route path="/login" element={<PrivateRoute publicPage={true}><LoginPage /></PrivateRoute>} />

                <Route path="/dashboard" element={<PrivateRoute publicPage={false}><DashboardLayout /></PrivateRoute>} />
                <Route path="/error" element={ <ErrorPage />} />
                <Route path="*" element={ <ErrorPage message="Oops! We couldn’t find the page you’re looking for" />} />
            </Routes>
            {!hideHeaderFooter && <Footer />}
        </>
    );
}

export default AppRouter;

export const SubDomainRouter = () => {
    return (
        <Routes>
            <Route path="/:url" element={<ShortenUrlPage />} />
        </Routes>
    )
}