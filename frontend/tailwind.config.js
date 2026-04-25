/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        "primary-hover": "#1D4ED8",

        background: "#F8FAFC",
        surface: "#FFFFFF",

        textMain: "#0F172A",
        textSecondary: "#475569",

        border: "#E2E8F0",

        accent: "#16A34A",
      },
    },
  },
  plugins: [],
};