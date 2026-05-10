const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("VITE_API_URL is required");
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions extends Omit<RequestInit, "method" | "body"> {
  method?: HttpMethod;
  body?: unknown;
}

export const buildApiUrl = (endpoint: string): string => {
  const normalizedBase = API_URL.replace(/\/$/, "");
  const normalizedEndpoint = endpoint.replace(/^\//, "");
  return `${normalizedBase}/${normalizedEndpoint}`;
};

export const apiRequest = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
  const { method = "GET", body, headers, ...rest } = options;

  const res = await fetch(buildApiUrl(endpoint), {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(headers ?? {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    ...rest,
  });

  if (res.status === 401) {
    window.dispatchEvent(new CustomEvent("auth:logout"));
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const error = new Error(`Request failed with status ${res.status}`);
    throw error;
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
};

export const fetcher = <T>(endpoint: string): Promise<T> => apiRequest<T>(endpoint);