import { apiRequest, fetcher } from "./client";
import type { ActivityDetails } from "../features/activities/types/activity";

export const getActivity = (id: string) => {
  return fetcher<ActivityDetails>(`activities/${id}`);
};

export const syncActivities = async () => {
  return apiRequest("dashboard", { method: "GET" });
};