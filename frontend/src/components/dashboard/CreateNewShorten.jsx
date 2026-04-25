import { useState } from "react";
import { useStoreContext } from "../../contextApi/ContextApi"
import { useForm } from "react-hook-form";
import api from "../../api/api";
import toast from "react-hot-toast";
import { Tooltip } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import TextField from "../TextField";


const CreateNewShorten = ({setOpen, refetch}) => {
    const {token} = useStoreContext();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        defaultValues: {
            originalUrl: "",
        },
        mode: "onTouched",
    });

    const createShortUrlHandler = async (formData) => {
        setLoading(true);
        try {
            const {data: res} = await api.post(
                "/api/urls/shorten",
                formData
            );

            const shortUrl = `${
            import.meta.env.VITE_REACT_FRONT_END_URL
            }/s/${res.shortUrl}`;

            await navigator.clipboard.writeText(shortUrl);

            toast.success("Short URL copied to clipboard.");

            reset();
            refetch?.();
            setOpen(false);
        }
        catch (error) {
            toast.error("Failed to create short URL");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <form
                onSubmit={handleSubmit(createShortUrlHandler)}
                className="relative w-full max-w-md bg-surface border border-border rounded-xl shadow-sm p-6 sm:p-8"
                >
                    <Tooltip title="Close">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="absolute top-3 right-3 text-textSecondary hover:text-textMain transition"
                            >
                                <RxCross2 className="text-2xl" />
                            </button>
                    </Tooltip>

                    <h1 className="text-center text-textMain text-xl sm:text-2xl font-semibold mb-2">
                        Create Short Link
                    </h1>

                    <p className="text-center text-textSecondary text-sm mb-6">
                        Paste your long URL below to generate a short link
                    </p>

                    <div className="mb-4">
                        <TextField 
                            label="Enter URL"
                            required
                            id="originalUrl"
                            placeholder="https://example.com"
                            type="url"
                            message="URL is required"
                            register={register}
                            errors={errors}
                        />
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-primary hover:bg-primary-hover text-white py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 disabled:opacity-70">
                            {loading ? "Creating..." : "Create Short Link"}
                        </button>
                </form>
        </div>
    );
};

export default CreateNewShorten;