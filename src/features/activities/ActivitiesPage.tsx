import { useNavigate } from "react-router-dom";
import { useDashboard } from "../dashboard/hooks/useDashboard";
import LoadingScreen from "../../shared/components/LoadingSpinner";
import ActivityTableHeader from "./components/ActivityTableHeader";
import ActivityList from "./components/ActivityList";

const ActivitiesPage = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return <LoadingScreen message="Loading activities..." />;
  }

  // if (isError) {
  //   return (
  //     <div className="lg:col-span-8">
  //       <div className="bg-surface-container-lowest rounded-xl ambient-shadow p-lg flex flex-col h-full border border-surface-container-low">
  //         <div className="flex items-center justify-center h-64 text-on-surface-variant">
  //           <div className="text-center">
  //             <p className="font-body-md text-body-md mb-unit">Failed to load activities</p>
  //             <p className="font-body-sm text-body-sm text-on-surface-variant">
  //               { isError ?  isError.message : "Unknown error"}
  //             </p>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  const activityList = data?.recentActivities || [];

  return (
    <div className="lg:col-span-8">
      <div className="bg-surface-container-lowest rounded-xl ambient-shadow p-lg flex flex-col h-full border border-surface-container-low">
        <ActivityTableHeader />
        <ActivityList activities={activityList} onActivityClick={(id) => navigate(`/app/activities/${id}`)} />

        <div className="mt-auto pt-lg flex justify-center">
          <button className="font-body-md text-body-md text-primary hover:text-primary-container transition-colors flex items-center gap-unit">
            View All History
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesPage;


