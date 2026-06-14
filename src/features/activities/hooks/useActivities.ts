import { useQuery } from "@tanstack/react-query";
import { getActivities } from "../../../api/activities";
import type { Activity } from "../types/activity";

export const useActivities = () => {
  return useQuery<Activity[]>({
    queryKey: ["activities"],
    queryFn: getActivities,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
