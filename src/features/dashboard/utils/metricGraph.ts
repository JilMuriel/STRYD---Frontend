import type { MetricHealthState, MetricKey, MetricTrend } from "../types/metrics";
import { getMetricIntensity } from "./metricEvaluation";

type Point = [number, number];

const getBaseline = (trend: MetricTrend) => {
  if (trend === "up") return [42, 36, 30, 24, 18];
  if (trend === "down") return [20, 26, 31, 38, 44];
  return [31, 30, 31, 30, 31];
};

const getMetricWaveOffsets = (metric: MetricKey, healthState: MetricHealthState) => {
  if (metric === "ATL") return [0, -8, 5, -10, 3];
  if (metric === "TSB") return [0, -3, 4, -2, 1];
  if (healthState === "aggressive") return [0, -4, 3, -6, -3];
  return [0, -2, 2, -3, 0];
};

const clampY = (value: number) => Math.max(8, Math.min(46, value));

const createPoints = (
  metric: MetricKey,
  trend: MetricTrend,
  healthState: MetricHealthState,
  delta: number,
): Point[] => {
  const intensity = getMetricIntensity(delta);
  const baseline = getBaseline(trend);
  const offsets = getMetricWaveOffsets(metric, healthState);

  return baseline.map((y, index) => [index * 25, clampY(y + offsets[index] * intensity)]);
};

const createSmoothPath = (points: Point[]) => {
  const [start, ...rest] = points;

  return rest.reduce((path, point, index) => {
    const previous = points[index];
    const controlX = (previous[0] + point[0]) / 2;

    return `${path} C ${controlX},${previous[1]} ${controlX},${point[1]} ${point[0]},${point[1]}`;
  }, `M ${start[0]},${start[1]}`);
};

const createJaggedPath = (points: Point[]) => {
  const [start, ...rest] = points;

  return rest.reduce((path, point) => `${path} L ${point[0]},${point[1]}`, `M ${start[0]},${start[1]}`);
};

export const createMetricGraphPaths = (
  metric: MetricKey,
  trend: MetricTrend,
  healthState: MetricHealthState,
  delta: number,
) => {
  const points = createPoints(metric, trend, healthState, delta);
  const linePath = metric === "ATL" ? createJaggedPath(points) : createSmoothPath(points);
  const areaPath = `${linePath} L 100,50 L 0,50 Z`;

  return {
    areaPath,
    linePath,
    isDashed: metric === "ATL" || healthState === "fatigueRisk" || healthState === "overreaching",
  };
};