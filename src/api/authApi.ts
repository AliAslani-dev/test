import { loginUrl } from "@/constants/apiUrls";
import { apiClient } from "./axiosClient";

interface LoginPayload {
  username: string | null;
  password: string;
}

const authApi = {
  login: (data: LoginPayload) =>
    apiClient.post(loginUrl, data),
};

export default authApi;
