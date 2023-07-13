import axios from "axios";

export const axiosHttpClient = axios.create({
    baseURL: "http://localhost:3000/api/v6/",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    timeout: 3000,
})

axiosHttpClient.interceptors.response.use(
    (successResponse) => successResponse.data,
    (errorResponse) => {
        console.log(errorResponse)
        return Promise.reject(
            errorResponse?.response?.data?.message || errorResponse?.message
        );
    }
)