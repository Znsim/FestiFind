import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://port-0-festfindcon-m5h20ajhfe0ec0f1.sel4.cloudtype.app/"

console.log("API Base URL:", API_BASE_URL); // 환경 변수 확인용

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    headers: {
        "Content-Type":"application/json",
    },
});

export default api;