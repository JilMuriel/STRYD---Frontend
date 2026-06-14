import { Suspense, lazy, useMemo } from "react";
import CardContainer from "./components/CardContainer";
import { useDashboard } from "./hooks/useDashboard";
import type { RecentActivityItem } from "./components/RecentActivitiesTable";
import { classifyRide } from "../../shared/utils/rideClassifier";
import type { MetricCardData } from "./types/metrics";
import { generateCoachingInsights, type CoachingMetrics } from "./utils/coachingInsights";

const PerformanceTrendsCard = lazy(() => import("./components/PerformanceTrendsCard"));
const RecentActivitiesTable = lazy(() => import("./components/RecentActivitiesTable"));

const ChartSkeleton = () => (
  <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_20px_40px_rgba(23,29,28,0.03)] min-h-90 animate-pulse" />
);

const ActivitiesSkeleton = () => (
  <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_20px_40px_rgba(23,29,28,0.03)] min-h-80 animate-pulse" />
);

const getPreviousMetricValue = (
  chart: { ctl: number; atl: number; tsb: number }[],
  key: "ctl" | "atl" | "tsb",
  fallback: number,
) => {
  if (chart.length < 2) return fallback;

  return chart[chart.length - 2]?.[key] ?? fallback;
};

const getMetricValueDaysAgo = (
  chart: { ctl: number; atl: number; tsb: number }[],
  key: "ctl" | "atl" | "tsb",
  daysAgo: number,
  fallback: number,
) => {
  if (chart.length === 0) return fallback;

  const index = Math.max(0, chart.length - 1 - daysAgo);
  return chart[index]?.[key] ?? fallback;
};

const getWeeklyTSS = (data: { weeklyTSS?: number[]; recentActivities: { tss: number }[] }) => {
  if (data.weeklyTSS?.length) return data.weeklyTSS;

  const recentTotal = data.recentActivities.reduce((total, activity) => total + activity.tss, 0);
  return recentTotal > 0 ? [recentTotal] : [];
};

const Dashboard = () => {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Unauthorized or failed to load</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const metricCards = useMemo<MetricCardData[]>(
    () => [
      {
        title: "Fitness (CTL)",
        metric: "CTL",
        value: data.metrics.ctl,
        previousValue: getPreviousMetricValue(data.chart, "ctl", data.metrics.ctl),
        target: 110,
      },
      {
        title: "Fatigue (ATL)",
        metric: "ATL",
        value: data.metrics.atl,
        previousValue: getPreviousMetricValue(data.chart, "atl", data.metrics.atl),
      },
      {
        title: "Form (TSB)",
        metric: "TSB",
        value: data.metrics.tsb,
        previousValue: getPreviousMetricValue(data.chart, "tsb", data.metrics.tsb),
      },
    ],
    [data],
  );

  const coachingMetrics = useMemo<CoachingMetrics>(() => ({
    currentCTL: data.metrics.ctl,
    currentATL: data.metrics.atl,
    currentTSB: data.metrics.tsb,
    ctl14DaysAgo: getMetricValueDaysAgo(data.chart, "ctl", 14, data.metrics.ctl),
    ctl28DaysAgo: getMetricValueDaysAgo(data.chart, "ctl", 28, data.metrics.ctl),
    weeklyTSS: getWeeklyTSS(data),
  }), [data]);

  const coachingInsights = useMemo(
    () => generateCoachingInsights(coachingMetrics),
    [coachingMetrics],
  );

  const recentActivities = useMemo<RecentActivityItem[]>(
    () =>
      data.recentActivities.map((activity) => {
        const classification = classifyRide({
          distance: activity.distance,
          movingTime: activity.movingTime ?? activity.duration,
          duration: activity.duration,
          elevationGain: activity.elevationGain,
          tss: activity.tss,
          intensityFactor: activity.intensityFactor,
          averagePower: activity.averagePower,
          averageSpeed: activity.averageSpeed,
          activityType: activity.activityType,
        });

        return {
          id: activity.id,
          title: activity.name,
          type: classification.label,
          date: "Recent",
          distance: `${(activity.distance / 1000).toFixed(1)} km`,
          tss: Math.round(activity.tss),
          icon: classification.icon,
          iconContainerClassName: `w-10 h-10 rounded-lg flex items-center justify-center ${classification.color}`,
          iconClassName: "material-symbols-outlined text-sm",
          tooltip: classification.label,
        };
      }),
    [data],
  );

  return (
    <div>
      <CardContainer metrics={metricCards} />

      <Suspense fallback={<ChartSkeleton />}>
        <PerformanceTrendsCard chart={data.chart} coachingInsights={coachingInsights} />
      </Suspense>

      <Suspense fallback={<ActivitiesSkeleton />}>
        <RecentActivitiesTable activities={recentActivities} />
      </Suspense>
    </div>
  );
};

export default Dashboard;
