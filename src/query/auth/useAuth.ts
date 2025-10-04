import { useMutation } from "@tanstack/react-query";
import authApi from "@/api/authApi";

// ✅ Login with password
export const useLogin = () =>
  useMutation({
    mutationFn: (data: { username: string | null; password: string }) =>
      authApi.login(data),
  });
