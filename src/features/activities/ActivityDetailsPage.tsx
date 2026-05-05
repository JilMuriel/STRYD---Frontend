import Layout from "../../shared/components/Layout";
import { useActivity } from "./hooks/useActivity";
import { useNavigate, useParams } from "react-router-dom";

const ActivityDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useActivity(id!);
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    return (
      <Layout>
        <div className="text-center mt-20">
          <h1 className="text-xl font-semibold">Activity not found</h1>
          <p className="text-gray-500 mt-2">
            The activity you’re looking for does not exist.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 px-4 py-2 bg-gray-100 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </Layout>
    );
  }

  if (!data) return null;

  return (
    <Layout>
      <button
        onClick={() => navigate(-1)} // 👈 go back
        className="text-sm text-gray-500 hover:text-black mb-4"
      >
        ← Back
      </button>
      <div className="space-y-6">

        {/* Title */}
        <div>
          <h1 className="text-2xl font-semibold">{data.name}</h1>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Ride Insight</h2>

          <p className="text-sm text-gray-500 mb-2">
            {data.insight.message}
          </p>

          <div className="flex gap-2 text-sm">
            <span className="px-2 py-1 bg-blue-100 rounded-lg">
              {data.insight.type}
            </span>
            <span className="px-2 py-1 bg-red-100 rounded-lg">
              {data.insight.fatigue}
            </span>
            <span className="px-2 py-1 bg-green-100 rounded-lg">
              {data.insight.effort}
            </span>
          </div>
        </div>
        {data.metric && (
          <div className="grid grid-cols-3 gap-4">

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-sm text-gray-500">Fitness</p>
              <p className="font-semibold text-blue-500">
                {Math.round(data.metric.ctl)}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-sm text-gray-500">Fatigue</p>
              <p className="font-semibold text-red-500">
                {Math.round(data.metric.atl)}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-sm text-gray-500">Form</p>
              <p className="font-semibold text-green-500">
                {Math.round(data.metric.tsb)}
              </p>
            </div>

          </div>
        )}
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-sm text-gray-500">Distance</p>
            <p className="text-lg font-semibold">
              {(data.distance / 1000).toFixed(1)} km
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-sm text-gray-500">Duration</p>
            <p className="text-lg font-semibold">
              {(data.duration / 60).toFixed(0)} min
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-sm text-gray-500">TSS</p>
            <p className="text-lg font-semibold">
              {Math.round(data.tss)}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-sm text-gray-500">Avg Power</p>
            <p className="text-lg font-semibold">
              {data.avgPower ? `${Math.round(data.avgPower)} W` : "-"}
            </p>
          </div>

        </div>

      </div>
    </Layout>
  );
};

export default ActivityDetailsPage;