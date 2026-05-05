interface MetricCardProps {
  label: string;
  value: number;
  color: string;
}

const MetricCard = ({ label, value, color }: MetricCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-gray-500 text-sm font-medium">{label}</h3>
      <p className={`text-3xl font-bold ${color} mt-2`}>
        {value.toFixed(1)}
      </p>
    </div>
  );
};

export default MetricCard;
