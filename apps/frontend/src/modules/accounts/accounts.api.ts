import { axiosHttpClient } from "../shared/config/axios.config";

export function fetchUserProfile() {
    return axiosHttpClient.get("accounts/profile").then(res => res.data);
}

export function loginAccount(emailId: string, password: string) {
    return axiosHttpClient.post("accounts/login", {emailId, password});
}