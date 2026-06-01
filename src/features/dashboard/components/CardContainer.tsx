import MetricCard from "./MetricCard";
import type { MetricCardData } from "../types/metrics";

type CardContainerProps = {
  metrics: MetricCardData[];
};

const CardContainer = ({ metrics }: CardContainerProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {metrics.map((metric) => (
        <MetricCard key={metric.metric} data={metric} />
      ))}
    </div>
  );
};

export default CardContainer;