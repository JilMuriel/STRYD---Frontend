import { useMemo, useState } from "react";

import MetricsChartECharts from "../../MetricsChartECharts";
import { ranges, weeklyLoad } from "./constants";
import type { Props, TimeRange, WeeklyLoadItem } from "./types";
import { sliceChartByRange, toEChartsSeriesData } from "./utils";
import type { InsightCard as CoachingInsightCard } from "../../../utils/coachingInsights";

const cx = (...parts: Array<string | undefined | false>) => parts.filter(Boolean).join(" ");

type RangeFilterProps = {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
};

const RangeFilter = ({ value, onChange }: RangeFilterProps) => {
  const buttonBase = "px-3 py-1.5 rounded font-label-caps text-[10px] transition-colors";

  return (
    <div className="flex bg-surface-container-low rounded-lg p-1 border border-outline-variant/20">
      {ranges.map((range) => {
        const isActive = range === value;
        return (
          <button
            key={range}
            type="button"
            onClick={() => onChange(range)}
            className={cx(
              buttonBase,
              isActive ? "bg-primary text-white shadow-sm" : "text-on-surface-variant hover:text-primary"
            )}
          >
            {range}
          </button>
        );
      })}
    </div>
  );
};

type LegendItem = {
  label: string;
  marker: "square" | "dashed" | "bar";
  color: string;
};

const LEGEND_ITEMS: LegendItem[] = [
  { label: "Fitness (CTL)", marker: "square", color: "#4DB6AC" },
  { label: "Fatigue (ATL)", marker: "dashed", color: "#AF2E30" },
  { label: "Form (TSB)", marker: "bar", color: "var(--color-outline)" },
];

const Legend = () => {
  return (
    <div className="flex items-center gap-6 mt-4">
      {LEGEND_ITEMS.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          {item.marker === "square" && (
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
          )}
          {item.marker === "dashed" && (
            <div className="w-3 h-3 border-t-2 border-dashed" style={{ borderColor: item.color }} />
          )}
          {item.marker === "bar" && (
            <div className="w-2 h-3 opacity-40" style={{ backgroundColor: item.color }} />
          )}

          <span className="font-label-caps text-[10px] text-on-surface">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

type WeeklyLoadBreakdownProps = {
  items: WeeklyLoadItem[];
};

const WeeklyLoadBreakdown = ({ items }: WeeklyLoadBreakdownProps) => {
  return (
    <div className="bg-surface-container-low/50 px-lg py-md border-t border-outline-variant/10 grid grid-cols-1 md:grid-cols-3 gap-lg">
      {items.map((week) => (
        <div key={week.label} className="flex items-center gap-md">
          <div className="flex flex-col">
            <span className="font-label-caps text-[10px] text-on-surface-variant">{week.label}</span>
            <div className="flex items-center gap-1 font-body-sm font-bold text-on-surface">
              {week.tss} TSS
              <span className={cx("material-symbols-outlined text-[14px]", week.trendIconClassName)}>
                {week.trendIcon}
              </span>
            </div>
          </div>
          <div className="flex-grow bg-outline-variant/20 h-1.5 rounded-full overflow-hidden">
            <div className="bg-primary h-full" style={{ width: week.progressWidth }} />
          </div>
        </div>
      ))}
    </div>
  );
};

type InsightCardItem = {
  label: string;
  icon: string;
  insight: CoachingInsightCard;
  variant?: "default" | "recovery";
};

const insightIconClassName: Record<CoachingInsightCard["severity"], string> = {
  positive: "text-primary",
  neutral: "text-on-surface-variant",
  warning: "text-secondary",
};

const InsightCard = ({ label, icon, insight, variant = "default" }: InsightCardItem) => {
  const containerClassName =
    variant === "recovery"
      ? "bg-secondary-container/10 border border-secondary-container/20"
      : "bg-surface-container-low border border-outline-variant/5";

  const titleClassName = variant === "recovery" ? "text-secondary" : "text-on-surface-variant";
  const messageClassName = variant === "recovery" ? "text-on-secondary-container" : "text-on-surface";

  return (
    <div className={cx(containerClassName, "p-md rounded-lg")}>
      <div className="flex items-center justify-between mb-1">
        <span className={cx("font-label-caps text-[10px]", titleClassName)}>{label}</span>
        <span className={cx("material-symbols-outlined text-[16px]", insightIconClassName[insight.severity])}>
          {icon}
        </span>
      </div>
      <p className={cx("font-body-sm text-[13px] font-semibold", messageClassName)}>{insight.title}</p>
      <p className="mt-1 font-body-sm text-[12px] leading-snug text-on-surface-variant">{insight.description}</p>
    </div>
  );
};

const PerformanceTrendsCard = ({ chart, coachingInsights }: Props) => {
  const [range, setRange] = useState<TimeRange>("3M");

  const filteredChart = useMemo(() => sliceChartByRange(chart, range), [chart, range]);
  const seriesData = useMemo(() => toEChartsSeriesData(filteredChart), [filteredChart]);
  const insightCards = useMemo<InsightCardItem[]>(
    () => [
      {
        label: "Fitness Trend",
        icon: "trending_up",
        insight: coachingInsights.fitnessTrend,
      },
      {
        label: "Fatigue Trend",
        icon: "warning",
        insight: coachingInsights.fatigueTrend,
      },
      {
        label: "Readiness",
        icon: "battery_2_bar",
        insight: coachingInsights.readiness,
      },
      {
        label: "Projected CTL",
        icon: "event",
        insight: coachingInsights.projectedCTL,
      },
      {
        label: "Recovery Required",
        icon: "bed",
        insight: coachingInsights.recovery,
        variant: "recovery",
      },
    ],
    [coachingInsights],
  );

  return (
    <div className="py-[24px] flex flex-col lg:flex-row gap-lg">
      {/* Left: Main Chart Area */}
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-lg">
          <div>
            <h2 className="font-h3 text-h3 text-on-surface">Performance Trends</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">
              Track long-term fitness, short-term fatigue, and training readiness over time.
            </p>
          </div>
          {/* Filters */}
          <RangeFilter value={range} onChange={setRange} />
        </div>

        {/* Chart Visualization */}
        <MetricsChartECharts data={seriesData} transparent className="h-[360px]" />
        {/* Legend */}
        <Legend />
        {/* Weekly load summary */}
        <div className="mt-4 rounded-lg overflow-hidden">
          <WeeklyLoadBreakdown items={weeklyLoad} />
        </div>
      </div>

      {/* Right: Intelligence Column */}
      <div className="w-full lg:w-[280px] flex flex-col gap-sm border-l border-outline-variant/10 pl-lg">
        <span className="font-label-caps text-[11px] text-primary font-bold mb-1">COACHING INSIGHTS</span>

        {insightCards.map((card) => (
          <InsightCard key={`${card.label}-${card.insight.title}`} {...card} />
        ))}

      </div>
    </div>
  );
};

export default PerformanceTrendsCard;
