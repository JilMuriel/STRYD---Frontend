import type {
  MetricCardData,
  MetricHealthState,
  MetricTrend,
  MetricVisualState,
} from "../types/metrics";

const STABLE_DELTA_THRESHOLD = 0.5;
const LARGE_DELTA_THRESHOLD = 8;
const MODERATE_DELTA_THRESHOLD = 3;

const getTrend = (delta: number): MetricTrend => {
  if (Math.abs(delta) <= STABLE_DELTA_THRESHOLD) return "stable";
  return delta > 0 ? "up" : "down";
};

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en", {
    maximumFractionDigits: 1,
    minimumFractionDigits: Number.isInteger(value) ? 0 : 1,
  }).format(value);

const formatDelta = (delta: number, trend: MetricTrend) => {
  if (trend === "stable") return "Stable";

  const sign = delta > 0 ? "+" : "";
  return `${sign}${formatNumber(delta)}`;
};

const evaluateHealthState = ({ metric, value }: MetricCardData, delta: number, trend: MetricTrend): MetricHealthState => {
  if (metric === "CTL") {
    if (trend === "down") return "detraining";
    if (delta >= LARGE_DELTA_THRESHOLD) return "aggressive";
    return "healthy";
  }

  if (metric === "ATL") {
    if (trend === "down") return "recovery";
    if (delta >= LARGE_DELTA_THRESHOLD) return "fatigueRisk";
    return "productive";
  }

  if (value > 10) return "fresh";
  if (value >= 0) return "balanced";
  if (value >= -10) return "productive";
  if (value >= -30) return "heavyTraining";
  return "overreaching";
};

const getStatusText = (metric: MetricCardData["metric"], healthState: MetricHealthState, target?: number) => {
  if (metric === "CTL" && healthState === "healthy" && target) {
    return `Target: ${formatNumber(target)}`;
  }

  const statusText: Record<MetricHealthState, string> = {
    healthy: "Building fitness steadily",
    aggressive: "Aggressive training ramp",
    detraining: "Detraining risk",
    productive: metric === "ATL" ? "Productive training load" : "Productive training zone",
    fatigueRisk: "Fatigue risk rising",
    recovery: "Recovery load easing",
    fresh: "Fresh and ready",
    balanced: "Balanced readiness",
    heavyTraining: "Heavy training block",
    overreaching: "Overreaching risk",
  };

  return statusText[healthState];
};

const getIcon = (metric: MetricCardData["metric"], trend: MetricTrend, healthState: MetricHealthState) => {
  if (healthState === "fatigueRisk" || healthState === "overreaching") return "warning";
  if (metric === "ATL") return trend === "down" ? "battery_saver" : "battery_charging_20";
  if (metric === "TSB") return healthState === "fresh" ? "wb_sunny" : "water_drop";
  return trend === "down" ? "trending_down" : "trending_up";
};

const getVisualClasses = (metric: MetricCardData["metric"], healthState: MetricHealthState) => {
  if (metric === "CTL") {
    if (healthState === "detraining") {
      return {
        iconContainerClassName: "bg-tertiary-container/20",
        iconClassName: "text-on-tertiary-container",
        badgeClassName: "bg-tertiary-container/20 text-on-tertiary-container",
        graphClassName: "text-on-tertiary-container opacity-10",
      };
    }

    return {
      iconContainerClassName: "bg-primary-container/10",
      iconClassName: "text-primary",
      badgeClassName: "bg-primary-container/10 text-primary",
      graphClassName: "text-primary-container opacity-20",
    };
  }

  if (metric === "ATL") {
    if (healthState === "fatigueRisk") {
      return {
        iconContainerClassName: "bg-secondary-container/10",
        iconClassName: "text-secondary",
        badgeClassName: "bg-secondary-container/10 text-secondary",
        graphClassName: "text-secondary-container opacity-20",
      };
    }

    return {
      iconContainerClassName: "bg-tertiary-container/20",
      iconClassName: "text-on-tertiary-container",
      badgeClassName: "bg-tertiary-container/20 text-on-tertiary-container",
      graphClassName: "text-tertiary-container opacity-20",
    };
  }

  if (healthState === "overreaching") {
    return {
      iconContainerClassName: "bg-secondary-container/10",
      iconClassName: "text-secondary",
      badgeClassName: "bg-secondary-container/10 text-secondary",
      graphClassName: "text-secondary-container opacity-20",
    };
  }

  return {
    iconContainerClassName: "bg-tertiary-container/20",
    iconClassName: "text-on-tertiary-container",
    badgeClassName: "bg-tertiary-container/20 text-on-tertiary-container",
    graphClassName: "text-on-tertiary-container opacity-10",
  };
};

export const formatMetricValue = formatNumber;

export const evaluateMetricCard = (data: MetricCardData): MetricVisualState => {
  const delta = data.value - data.previousValue;
  const trend = getTrend(delta);
  const healthState = evaluateHealthState(data, delta, trend);
  const classes = getVisualClasses(data.metric, healthState);

  return {
    delta,
    trend,
    healthState,
    badgeText: formatDelta(delta, trend),
    statusText: getStatusText(data.metric, healthState, data.target),
    icon: getIcon(data.metric, trend, healthState),
    ...classes,
  };
};

export const getMetricIntensity = (delta: number) => Math.min(Math.abs(delta) / MODERATE_DELTA_THRESHOLD, 2);