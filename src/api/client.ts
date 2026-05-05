const BASE_URL = "http://localhost:4000";
const PROD_URL = "https://stryd-backend.onrender.com/api"

export const fetcher = async <T>(endpoint: string): Promise<T> => {
  const res = await fetch(`${PROD_URL}/${endpoint}`, {
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