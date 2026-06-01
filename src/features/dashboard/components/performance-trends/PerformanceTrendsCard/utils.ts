import type { DashboardData } from "../../../types/dashboard";
import { RANGE_DAYS } from "./constants";
import type { TimeRange } from "./types";

export const sliceChartByRange = (chart: DashboardData["chart"], range: TimeRange) => {
  const days = RANGE_DAYS[range];
  return chart.slice(Math.max(0, chart.length - days));
};

// MetricsChartECharts supports optional hasRide/tss markers; our current API payload
// does not provide them, so we only map the required series.
export const toEChartsSeriesData = (chart: DashboardData["chart"]) =>
  chart.map((d) => ({
    date: d.date,
    ctl: d.ctl,
    atl: d.atl,
    tsb: d.tsb,
  }));
