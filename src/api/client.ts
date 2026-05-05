const API_URL = import.meta.env.VITE_API_URL;

export const fetcher = async <T>(endpoint: string): Promise<T> => {
  const res = await fetch(`${API_URL}/${endpoint}`, {
    credentials: "include",
  });

  if (res.status === 401) {
    window.location.href = "/"; // 🔥 force logout
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error("Request failed");
  }

  return res.json();
};