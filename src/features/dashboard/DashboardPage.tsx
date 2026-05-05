import Layout from "../../shared/components/Layout";
import MetricCard from "./components/MetricCard";
import MetricsChartECharts from "./components/MetricsChartECharts";
import { useDashboard } from "./hooks/useDashboard";
import ActivityList from "./components/ActivityList";

const Dashboard = () => {

    const { data, isLoading, isError } = useDashboard();

    if (isLoading) return <div>Loading...</div>;

    // 👇 VERY IMPORTANT
    if (isError) {
        return <div>Unauthorized or failed to load</div>;
    }

    if (!data) {
        return <div>No data available</div>;
    }

    return (
        <Layout>
            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <MetricCard label="Fitness (CTL)" value={data.metrics.ctl} color="text-blue-500" />
                <MetricCard label="Fatigue (ATL)" value={data.metrics.atl} color="text-red-500" />
                <MetricCard label="Form (TSB)" value={data.metrics.tsb} color="text-green-500" />
            </div>

            {/* Chart */}
            <MetricsChartECharts data={data.chart} />

            <ActivityList activities={data.recentActivities} />
        </Layout>
    );
};

export default Dashboard;