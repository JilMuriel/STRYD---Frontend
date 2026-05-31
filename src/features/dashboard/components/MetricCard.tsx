import MetricBackgroundGraph from "./MetricBackgroundGraph";
import type { MetricCardData } from "../types/metrics";
import { evaluateMetricCard, formatMetricValue } from "../utils/metricEvaluation";

type MetricCardProps = {
  data: MetricCardData;
};

const MetricCard = ({ data }: MetricCardProps) => {
  const visualState = evaluateMetricCard(data);

  return (
    <div className="bg-surface-container-lowest rounded-xl p-[24px] shadow-[0_20px_40px_rgba(23,29,28,0.03)] flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
      <div className="flex justify-between items-start mb-[16px] z-10">
        <div className="flex items-center gap-[8px]">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${visualState.iconContainerClassName}`}>
            <span className={`material-symbols-outlined text-sm ${visualState.iconClassName}`}>{visualState.icon}</span>
          </div>
          <span className="font-body-md text-body-md font-medium text-on-surface">{data.title}</span>
        </div>
        <span className={`inline-flex items-center px-[8px] py-[4px] rounded-full font-medium tex890t-label-caps ${visualState.badgeClassName}`}>
          {visualState.badgeText}
        </span>
      </div>
      <div className="mt-auto z-10">
        <span className="font-data-point text-data-point font-bold mb-[10px]">{formatMetricValue(data.value)}</span>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">{visualState.statusText}</p>
      </div>
      <MetricBackgroundGraph metric={data.metric} visualState={visualState} />
    </div>
  );
};

export default MetricCard;