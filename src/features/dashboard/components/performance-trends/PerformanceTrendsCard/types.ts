import type { DashboardData } from "../../../types/dashboard";
import type { CoachingInsights } from "../../../utils/coachingInsights";

export type TimeRange = "2W" | "1M" | "3M" | "6M" | "1Y";

export type Props = {
  chart: DashboardData["chart"];
  coachingInsights: CoachingInsights;
};

export type WeeklyLoadItem = {
  label: string;
  tss: number;
  trendIcon: string;
  trendIconClassName: string;
  progressWidth: string;
};
