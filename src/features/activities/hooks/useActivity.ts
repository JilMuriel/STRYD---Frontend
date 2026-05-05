import { useQuery } from "@tanstack/react-query";
import { getActivity } from "../../../api/activities";

export const useActivity = (id: string) => {
    return useQuery({
        queryKey: ["activity", id],
        queryFn: () => getActivity(id),
        enabled: !!id,
        retry: false
    });
};
