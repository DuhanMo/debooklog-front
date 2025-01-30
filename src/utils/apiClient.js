import axios from "axios";
import CONFIG from "../config";

const baseUrl = CONFIG.API_BASE_URL

const apiClient = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;
