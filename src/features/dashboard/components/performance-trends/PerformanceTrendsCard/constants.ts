import type { TimeRange, WeeklyLoadItem } from "./types";

export const ranges: TimeRange[] = ["2W", "1M", "3M", "6M", "1Y"];

export const RANGE_DAYS: Record<TimeRange, number> = {
  "2W": 14,
  "1M": 30,
  "3M": 90,
  "6M": 180,
  "1Y": 365,
};

export const CHART_GOAL_LABEL = "GOAL: 110 CTL";

export const weeklyLoad: WeeklyLoadItem[] = [
  {
    label: "WEEK 1",
    tss: 480,
    trendIcon: "arrow_upward",
    trendIconClassName: "text-primary",
    progressWidth: "65%",
  },
  {
    label: "WEEK 2",
    tss: 520,
    trendIcon: "arrow_upward",
    trendIconClassName: "text-primary",
    progressWidth: "78%",
  },
  {
    label: "WEEK 3 (CURRENT)",
    tss: 340,
    trendIcon: "arrow_downward",
    trendIconClassName: "text-secondary",
    progressWidth: "45%",
  },
];
