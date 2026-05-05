import { fetcher } from "./client";
import type { DashboardData } from '../features/dashboard/types/dashboard';

export const getDashboard = () => {
    return fetcher<DashboardData>("dashboard");
};