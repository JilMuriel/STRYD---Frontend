import type { Activity } from "../types/activity";
import { getActivityStyle, formatDate, formatTime, formatDuration } from "./activityDisplayUtils";

type ActivityRowProps = {
  activity: Activity;
  onClick: () => void;
};

const ActivityRow = ({ activity, onClick }: ActivityRowProps) => {
  const { icon, bgClass, textClass } = getActivityStyle(activity.activityType);

  return (
    <div
      onClick={onClick}
      className="grid grid-cols-12 gap-md py-md items-center group cursor-pointer hover:bg-surface-container-low rounded-lg px-sm -mx-sm transition-colors duration-200 border-b border-surface-container-highest last:border-0"
    >
      <div className="col-span-3 flex flex-col">
        <span className="font-body-md text-body-md text-on-surface font-semibold">
          {formatDate(activity.date)}
        </span>
        <span className="font-body-sm text-body-sm text-on-surface-variant">
          {formatTime(activity.date)}
        </span>
      </div>

      <div className="col-span-4 flex items-center gap-sm">
        <div className={`w-8 h-8 rounded-full ${bgClass} ${textClass} flex items-center justify-center shrink-0`}>
          <span className="material-symbols-outlined text-[18px]">{icon}</span>
        </div>
        <span className="font-body-md text-body-md text-on-surface truncate">{activity.name}</span>
      </div>

      <div className="col-span-2 text-right font-h3 text-h3 text-on-surface">
        {activity.distance.toFixed(1)}
        <span className="text-body-sm text-on-surface-variant ml-unit">km</span>
      </div>

      <div className="col-span-2 text-right font-body-md text-body-md text-on-surface">
        {formatDuration(activity.duration)}
      </div>

      <div className="col-span-1 text-right">
        <span className={`inline-flex items-center justify-center ${bgClass} ${textClass} font-label-caps text-label-caps px-2 py-1 rounded`}>
          {activity.tss}
        </span>
      </div>
    </div>
  );
};

export default ActivityRow;
