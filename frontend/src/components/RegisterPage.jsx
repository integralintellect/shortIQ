import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"
import api from "../api/api";
import toast from "react-hot-toast";
import TextField from "./TextField";


const RegisterPage = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
        mode: "onTouched",
    });

    const registerHandler = async (data) => {
        setLoader(true);
        try {
            await api.post("/api/auth/public/register", data);

            reset();
            toast.success("Registration successful!");
            navigate("/login");
        }
        catch (error) {
            toast.error("Registration failed. Please try again.");
        }
        finally {
            setLoader(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-background px-5 sm:px-8">

            <form
                onSubmit={handleSubmit(registerHandler)}
                className="w-full max-w-md bg-surface border border-border rounded-xl shadow-sm p-6 sm:p-8"
            >
                <h1 className="text-center text-textMain text-2xl sm:text-3xl font-semibold mb-2">
                    Create an account
                </h1>

                <p className="text-center text-textSecondary text-sm mb-6">
                    Start managing and tracking your links easily
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
                        label="Email"
                        required
                        id="email"
                        type="email"
                        message="Email is required"
                        placeholder="Enter your email"
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
                    {loader ? "Creating account..." : "Register"}
                </button>

                <p className="text-center text-sm text-textSecondary mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-primary font-medium hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;