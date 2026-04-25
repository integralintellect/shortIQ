import axios from "axios";


const api = axios.create({
    baseURL: "https://urlbackend-gmp7.onrender.com",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("JWT_TOKEN");

    if(token && token != "undefined") {
        config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }

    return config;
});

export default api;