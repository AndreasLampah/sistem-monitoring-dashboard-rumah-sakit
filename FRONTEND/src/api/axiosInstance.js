import axios from "axios";

const api = axios.create({
    baseURL: "",      // kosong = path relatif → lewat proxy Vite
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("[API Error]", error.config?.url, error.message);
        return Promise.reject(error);
    }
);

export default api;