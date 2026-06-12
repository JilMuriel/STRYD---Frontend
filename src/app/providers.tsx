import { useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { clearUserDataCache, queryClient } from "./queryClient";

const AuthCacheBoundary = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    window.addEventListener("auth:logout", clearUserDataCache);

    return () => {
      window.removeEventListener("auth:logout", clearUserDataCache);
    };
  }, []);

  return <>{children}</>;
};

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthCacheBoundary>{children}</AuthCacheBoundary>
    </QueryClientProvider>
  );
};
