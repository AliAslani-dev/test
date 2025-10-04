import { AuthUrl } from "@/constants/apiUrls";
import { apiClient } from "./axiosClient";

interface LoginPayload {
  username: string | null;
  password: string;
}

interface SignUpPayload {
  username: string | null;
  password: string;
}

const authApi = {
  login: (data: LoginPayload) =>
    apiClient.post(`${AuthUrl}/login`, data),
  SignUp: (data: SignUpPayload) =>
    apiClient.post(`${AuthUrl}/new-user`, data),
};

export default authApi;
