import axios from "axios";
import { environment } from "../environment";

export const axiosHttpClient = axios.create({
    baseURL: `${environment.API_URL}/api/v6/`,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    timeout: 13000,
    withCredentials: true,
})

axiosHttpClient.interceptors.response.use(
    (successResponse) => successResponse,
    (errorResponse) => {
        console.log(errorResponse)
        return Promise.reject(
            errorResponse?.response?.data?.message || errorResponse?.message
        );
    }
)