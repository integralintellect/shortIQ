const TextField = ({
    label,
    id,
    type,
    errors,
    register,
    required,
    message,
    className,
    min,
    placeholder,
}) => {
    return (
        <div className="flex flex-col gap-1.5">

            <label
                htmlFor={id}
                className={`text-sm font-medium text-textMain ${className || ""}`}
                >
                    {label}
            </label>

            <input
                type={type}
                id={id}
                placeholder={placeholder}
                className={`px-3 py-2.5 rounded-lg border bg-surface text-textMain outline-none transition-all duration-200 ${
                    errors[id]?.message
                        ? "border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-border focus:border-primary focus:ring-2 focus:ring-primary/30"
                }`}
                {...register(id, {
                    required: required ? message : false,
                    minLength: min
                        ? {value: min, message: `Minimum ${min} characters required`}
                        : undefined,
                        
                    pattern:
                        type === "email"
                            ? {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address",
                            }
                            : type === "url"
                            ? {
                                value: /^(https?:\/\/)?(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})(:\d{2,5})?(\/.*)?$/,
                                message: "Enter a valid URL",
                            }
                            :undefined,
                    })}
                />

                {errors[id]?.message && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors[id]?.message}
                    </p>
                )}
        </div>
    );
};

export default TextField;