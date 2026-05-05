import ReactECharts from "echarts-for-react";
import { formatDate } from "../../../shared/utils/dateFormater";

type Props = {
  data: {
    date: string;
    ctl: number;
    atl: number;
    tsb: number;
    hasRide?: boolean;
    tss?: number;
  }[];
};

const getInsight = (tsb: number) => {
  if (tsb > 10) {
    return {
      message: "You are fresh — great day for a hard effort 💪",
      color: "#22c55e",
    };
  }

  if (tsb >= -10) {
    return {
      message: "You are in a balanced state — steady training is ideal",
      color: "#3b82f6",
    };
  }

  if (tsb >= -25) {
    return {
      message: "You are training productively — fatigue is building",
      color: "#eab308",
    };
  }

  return {
    message: "You are highly fatigued — consider recovery 💤",
    color: "#ef4444",
  };
};

const MetricsChartECharts = ({ data }: Props) => {
  const dates = data.map((d) => d.date);
  const ctl = data.map((d) => Math.round(d.ctl));
  const atl = data.map((d) => Math.round(d.atl));
  const tsb = data.map((d) => Math.round(d.tsb));
  console.log('data charts:', data)

  const ridePoints = data
    .map((d) => ({
      coord: [d.date, Math.round(d.tsb)],
      value: Math.round(d.tsb),
      tss: d.tss,
    }))
    .filter((_, i) => data[i].hasRide);

  // ✅ Dynamic range (important so zones always show)
  const minY = Math.min(...ctl, ...atl, ...tsb) - 10;
  const maxY = Math.max(...ctl, ...atl, ...tsb) + 10;

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6b7280",
        },
      },
      backgroundColor: "#fff",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      textStyle: {
        color: "#111827",
      },
      formatter: (params: any) => {
        const ctl = params.find((p: any) => p.seriesName === "Fitness")?.value;
        const atl = params.find((p: any) => p.seriesName === "Fatigue")?.value;
        const tsb = params.find((p: any) => p.seriesName === "Form")?.value;

        const formattedDate = formatDate(params[0].axisValue);

        const insight = getInsight(tsb);

        return `
          <div>
            <strong>${formattedDate}</strong><br/>
            <span style="color:#3b82f6">Fitness: ${ctl}</span><br/>
            <span style="color:#ef4444">Fatigue: ${atl}</span><br/>
            <span style="color:#22c55e">Form: ${tsb}</span>
            <br/>
            <span style="color: ${insight.color};" font-weight: 500">
              ${insight.message}
            </span>
          </div>
        `;
      },
    },

    grid: {
      left: 40,
      right: 20,
      top: 20,
      bottom: 30,
    },

    xAxis: {
      type: "category",
      data: dates,
      axisLabel: {
        formatter: (value: string) => {
          const date = new Date(value);
          return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
        },
      },
    },

    yAxis: {
      type: "value",
      min: minY,
      max: maxY,
      axisLabel: {
        formatter: (value: number) => Math.round(value),
      },
    },

    series: [
      {
        name: "Fitness",
        type: "line",
        data: ctl,
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: { color: "#3b82f6", width: 2 },
        itemStyle: { color: "#3b82f6" },
      },
      {
        name: "Fatigue",
        type: "line",
        data: atl,
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: { color: "#ef4444", width: 2 },
        itemStyle: { color: "#ef4444" },
      },

      {
        name: "Form",
        type: "line",
        data: tsb,
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: { color: "#22c55e", width: 2 },
        itemStyle: { color: "#22c55e" },

        // ✅ TRAINING ZONES (VISIBLE + FIXED)
        markArea: {
          silent: true,
          z: -1, // behind lines
          itemStyle: {
            borderWidth: 0,
          },
          data: [
            // 🟢 Fresh
            [
              {
                yAxis: 10,
                itemStyle: {
                  color: "rgba(34, 197, 94, 0.15)",
                },
              },
              {
                yAxis: maxY,
              },
            ],

            // 🟡 Productive
            [
              {
                yAxis: -25,
                itemStyle: {
                  color: "rgba(234, 179, 8, 0.15)",
                },
              },
              {
                yAxis: -10,
              },
            ],

            // 🔴 Fatigue
            [
              {
                yAxis: minY,
                itemStyle: {
                  color: "rgba(239, 68, 68, 0.15)",
                },
              },
              {
                yAxis: -30,
              },
            ],
          ],
        },
        markPoint: {
          symbol: "circle",
          symbolSize: 10,
          itemStyle: {
            color: "#111827",
            borderColor: "#fff",
            borderWidth: 2,
          },
          data: ridePoints,
        }
      },

    ],
  };
  console.log('heeeeee:', data)
  return (
    <div className="w-full h-[320px] bg-white rounded-2xl p-4 shadow-sm">
      <ReactECharts option={option} style={{ height: "100%" }} />
    </div>
  );
};

export default MetricsChartECharts;