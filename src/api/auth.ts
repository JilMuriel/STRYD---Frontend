import { apiRequest } from "./client";

interface LogoutResponse {
  success: boolean;
  message?: string;
}

export const logout = async (): Promise<LogoutResponse> => {
  return apiRequest<LogoutResponse>("/auth/logout", {
    method: "POST",
  });
};
