import type { DashboardData } from "../../../types/dashboard";

export type TimeRange = "2W" | "1M" | "3M" | "6M" | "1Y";

export type Props = {
  chart: DashboardData["chart"]; // keep public API identical to original component
};

export type WeeklyLoadItem = {
  label: string;
  tss: number;
  trendIcon: string;
  trendIconClassName: string;
  progressWidth: string;
};
