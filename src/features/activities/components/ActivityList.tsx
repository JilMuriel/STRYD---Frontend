import type { Activity } from "../types/activity";
import ActivityRow from "./ActivityRow";

type ActivityListProps = {
  activities: Activity[];
  onActivityClick: (id: string) => void;
};

const ActivityList = ({ activities, onActivityClick }: ActivityListProps) => {
  if (activities.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-on-surface-variant">
        <p className="font-body-md text-body-md">No activities found</p>
      </div>
    );
  }

  return (
    <>
      {activities.map((activity) => (
        <ActivityRow
          key={activity.id}
          activity={activity}
          onClick={() => onActivityClick(activity.id)}
        />
      ))}
    </>
  );
};

export default ActivityList;
