import { apiRequest, fetcher } from "./client";
import type { ActivityDetails, Activity } from "../features/activities/types/activity";

export const getActivity = (id: string) => {
  return fetcher<ActivityDetails>(`activities/${id}`);
};

export const getActivities = () => {
  return fetcher<Activity[]>("activities");
};

export const syncActivities = async () => {
  return apiRequest("dashboard", { method: "GET" });
};