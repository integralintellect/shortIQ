import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useStoreContext } from "../contextApi/ContextApi";
import { useForm } from "react-hook-form";
import api from "../api/api";
import toast from "react-hot-toast";
import TextField from "./TextField";


const LoginPage = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const {setToken} = useStoreContext();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
        mode: "onTouched",
    });

    const loginHandler = async (data) => {
        setLoader(true);

        try {
            const {data: response} = await api.post(
                "/api/auth/public/login",
                data
            );

            setToken(response.token);
            localStorage.setItem("JWT_TOKEN", JSON.stringify(response.token));

            toast.success("Login successful!");
            reset();
            navigate("/dashboard");
        }
        catch (error) {
            if(error.response) {
                const status = error.response.status;

                if(status === 404) {
                    toast.error("User not found. Please check your username.");
                }
                else if(status === 401) {
                    toast.error("Invalid username or password. Please try again.");
                }
                else {
                    toast.error("Login failed. Please try again.");
                }
            }
            else {
                toast.error("Network error. Please check your connection and try again.");
            }
        }
        finally {
            setLoader(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-background px-5 sm:px-8">

            <form
                onSubmit={handleSubmit(loginHandler)}
                className="w-full max-w-md bg-surface border border-border rounded-xl shadow-sm p-6 sm:p-8"
                >
                    <h1 className="text-center font-semibold text-textMain text-2xl sm:text-3xl mb-2">
                        Welcome Back
                    </h1>

                    <p className="text-center text-textSecondary text-sm mb-6">
                        Login to manage your links and track performance
                    </p>

                    <div className="flex flex-col gap-4">
                        <TextField
                            label="Username"
                            required
                            id="username"
                            type="text"
                            message="Username is required"
                            placeholder="Enter your username"
                            register={register}
                            errors={errors}
                        />

                        <TextField
                            label="Password"
                            required
                            id="password"
                            type="password"
                            message="Password is required"
                            placeholder="Enter your password"
                            register={register}
                            min={6}
                            errors={errors}
                        />
                    </div>

                    <button
                        disabled={loader}
                        type="submit"
                        className="w-full mt-5 bg-primary hover:bg-primary-hover text-white py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 disabled:opacity-70"
                        >
                            {loader ? "Logging in..." : "Login"}
                    </button>

                    <p className="text-center text-sm text-textSecondary mt-6">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-primary font-medium hover:underline">
                                Sign up
                            </Link>
                    </p>
                </form>
        </div>
    );
};

export default LoginPage;