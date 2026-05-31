export type MetricKey = "CTL" | "ATL" | "TSB";

export type MetricTrend = "up" | "down" | "stable";

export type MetricHealthState =
  | "healthy"
  | "aggressive"
  | "detraining"
  | "productive"
  | "fatigueRisk"
  | "recovery"
  | "fresh"
  | "balanced"
  | "heavyTraining"
  | "overreaching";

export type MetricCardData = {
  title: string;
  metric: MetricKey;
  value: number;
  previousValue: number;
  target?: number;
};

export type MetricVisualState = {
  delta: number;
  trend: MetricTrend;
  healthState: MetricHealthState;
  badgeText: string;
  statusText: string;
  icon: string;
  iconContainerClassName: string;
  iconClassName: string;
  badgeClassName: string;
  graphClassName: string;
};