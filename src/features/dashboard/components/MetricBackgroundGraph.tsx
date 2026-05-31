import type { MetricVisualState } from "../types/metrics";
import { createMetricGraphPaths } from "../utils/metricGraph";

type MetricBackgroundGraphProps = {
  metric: "CTL" | "ATL" | "TSB";
  visualState: MetricVisualState;
};

const MetricBackgroundGraph = ({ metric, visualState }: MetricBackgroundGraphProps) => {
  const { areaPath, linePath, isDashed } = createMetricGraphPaths(
    metric,
    visualState.trend,
    visualState.healthState,
    visualState.delta,
  );

  return (
    <svg
      className={`absolute bottom-0 left-0 w-full h-1/2 pointer-events-none metric-graph-drift ${visualState.graphClassName}`}
      preserveAspectRatio="none"
      viewBox="0 0 100 50"
      aria-hidden="true"
    >
      <path d={areaPath} fill="currentColor" />
      <path
        d={linePath}
        fill="none"
        stroke="currentColor"
        strokeDasharray={isDashed ? "4,4" : undefined}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export default MetricBackgroundGraph;