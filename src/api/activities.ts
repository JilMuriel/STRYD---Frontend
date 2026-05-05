import { fetcher } from "./client";
import type { ActivityDetails } from "../features/activities/types/activity";
import { apiClient } from '../shared/lib/apiClients'

export const getActivity = (id: string) => {
  return fetcher<ActivityDetails>(`activities/${id}`);
};

export const syncActivities = async () => {
  return apiClient("/api/dashboard");
};