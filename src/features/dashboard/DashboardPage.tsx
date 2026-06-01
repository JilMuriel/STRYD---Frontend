import CardContainer from "./components/CardContainer";
import { useDashboard } from "./hooks/useDashboard";
import RecentActivitiesTable, { type RecentActivityItem } from "./components/RecentActivitiesTable";
import { classifyRide } from "../../shared/utils/rideClassifier";
import type { MetricCardData } from "./types/metrics";
import PerformanceTrendsCard from "./components/PerformanceTrendsCard";

const getPreviousMetricValue = (
  chart: { ctl: number; atl: number; tsb: number }[],
  key: "ctl" | "atl" | "tsb",
  fallback: number,
) => {
  if (chart.length < 2) return fallback;

  return chart[chart.length - 2]?.[key] ?? fallback;
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

  const metricCards: MetricCardData[] = [
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
  ];

  const recentActivities: RecentActivityItem[] = data.recentActivities.map((activity) => {
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
  });

  return (
    <div>
      <CardContainer metrics={metricCards} />
      <PerformanceTrendsCard chart={data.chart} />
      <RecentActivitiesTable activities={recentActivities} />
    </div>
  );
};

export default Dashboard;