import { NavLink } from "react-router-dom";

export type RecentActivityItem = {
  id: string;
  title: string;
  type: string;
  date: string;
  distance: string;
  tss: number | string;
  icon?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
  tssClassName?: string;
  tooltip?: string;
};

type RecentActivitiesTableProps = {
  title?: string;
  viewAllTo?: string;
  viewAllLabel?: string;
  activities: RecentActivityItem[];
  onActivityClick?: (activity: RecentActivityItem) => void;
};

const styles = {
  card: "bg-surface-container-lowest rounded-xl p-[24px] shadow-[0_20px_40px_rgba(23,29,28,0.03)] mt-[24px] mb-[48px]",
  header: "flex justify-between items-center mb-[24px]",
  title: "font-h3 text-h3 text-on-surface",
  viewAllLink:
    "font-body-sm text-body-sm text-primary hover:text-primary-fixed-dim font-semibold flex items-center gap-[4px]",
  tableWrap: "w-full overflow-x-auto",
  table: "w-full text-left border-collapse",
  headRow: "border-b border-outline-variant/30",
  headCell: "pb-[8px] font-label-caps text-label-caps text-on-surface-variant font-semibold",
  row: "group hover:bg-surface-container-low transition-colors border-b border-outline-variant/10",
  lastRow: "group hover:bg-surface-container-low transition-colors",
  titleCell: "py-[16px] flex items-center gap-[16px]",
  defaultIconContainer: "w-10 h-10 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary",
  defaultIcon: "material-symbols-outlined text-sm",
  activityTitle: "font-body-md text-body-md text-on-surface font-semibold",
  activityType: "font-body-sm text-body-sm text-on-surface-variant",
  dateCell: "py-[16px] font-body-sm text-body-sm text-on-surface-variant",
  distanceCell: "py-[16px] font-body-md text-body-md text-on-surface text-right font-semibold",
  tssCell: "py-[16px] text-right",
  defaultTssBadge:
    "inline-flex items-center justify-center min-w-[40px] px-[8px] py-[4px] rounded-full bg-primary-container/10 text-primary font-label-caps text-label-caps font-bold",
};

const RecentActivitiesTable = ({
  title = "Recent Activities",
  viewAllTo = "/app/activities",
  viewAllLabel = "View All",
  activities,
  onActivityClick,
}: RecentActivitiesTableProps) => {

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <NavLink className={styles.viewAllLink} to={viewAllTo}>
          {viewAllLabel} <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </NavLink>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.headRow}>
              <th className={styles.headCell}>Title</th>
              <th className={styles.headCell}>Date</th>
              <th className={`${styles.headCell} text-right`}>Distance</th>
              <th className={`${styles.headCell} text-right`}>TSS</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => {
              const isLast = index === activities.length - 1;
              const isClickable = Boolean(onActivityClick);
              return (
                <tr
                  key={activity.id}
                  className={`${isLast ? styles.lastRow : styles.row} ${isClickable ? "cursor-pointer" : ""}`}
                  onClick={() => onActivityClick?.(activity)}
                >
                  <td className={styles.titleCell}>
                    <div className={activity.iconContainerClassName ?? styles.defaultIconContainer} title={activity.tooltip ?? activity.type}>
                      <span className={activity.iconClassName ?? styles.defaultIcon}>{activity.icon ?? "landscape"}</span>
                    </div>
                    <div>
                      <div className={styles.activityTitle}>{activity.title}</div>
                      <div className={styles.activityType} title={activity.tooltip ?? activity.type}>{activity.type}</div>
                    </div>
                  </td>
                  <td className={styles.dateCell}>{activity.date}</td>
                  <td className={styles.distanceCell}>{activity.distance}</td>
                  <td className={styles.tssCell}>
                    <span className={activity.tssClassName ?? styles.defaultTssBadge}>{activity.tss}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivitiesTable;