import { NavLink, useNavigate } from "react-router-dom";
import DataTable, { type Column } from "../../../shared/components/DataTable";

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
};

const styles = {
  card:
    "bg-surface-container-lowest rounded-xl p-[24px] shadow-[0_20px_40px_rgba(23,29,28,0.03)] mt-[24px] mb-[48px]",
  header: "flex justify-between items-center mb-[24px]",
  title: "font-h3 text-h3 text-on-surface",
  viewAllLink:
    "font-body-sm text-body-sm text-primary hover:text-primary-fixed-dim font-semibold flex items-center gap-[4px]",
  row:
    "group hover:bg-surface-container-low transition-colors border-b border-outline-variant/10",
  lastRow: "group hover:bg-surface-container-low transition-colors",
  titleCell: "py-[16px] flex items-center gap-[16px]",
  defaultIconContainer:
    "w-10 h-10 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary",
  defaultIcon: "material-symbols-outlined text-sm",
  activityTitle: "font-body-md text-body-md text-on-surface font-semibold",
  activityType: "font-body-sm text-body-sm text-on-surface-variant",
  dateCell: "py-[16px] font-body-sm text-body-sm text-on-surface-variant",
  distanceCell:
    "py-[16px] font-body-md text-body-md text-on-surface text-right font-semibold",
  tssCell: "py-[16px] text-right",
  defaultTssBadge:
    "inline-flex items-center justify-center min-w-[40px] px-[8px] py-[4px] rounded-full bg-primary-container/10 text-primary font-label-caps text-label-caps font-bold",
};

const RecentActivitiesTable = ({
  title = "Recent Activities",
  viewAllTo = "/app/activities",
  viewAllLabel = "View All",
  activities,
}: RecentActivitiesTableProps) => {
  const navigate = useNavigate();

  const columns: Column<RecentActivityItem>[] = [
    {
      key: "title",
      header: "Title",
      render: (activity) => (
        <div className={styles.titleCell}>
          <div
            className={
              activity.iconContainerClassName ?? styles.defaultIconContainer
            }
            title={activity.tooltip ?? activity.type}
          >
            <span className={activity.iconClassName ?? styles.defaultIcon}>
              {activity.icon ?? "landscape"}
            </span>
          </div>

          <div>
            <div className={styles.activityTitle}>{activity.title}</div>
            <div
              className={styles.activityType}
              title={activity.tooltip ?? activity.type}
            >
              {activity.type}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "date",
      header: "Date",
      render: (activity) => (
        <div className={styles.dateCell}>{activity.date}</div>
      ),
    },
    {
      key: "distance",
      header: "Distance",
      className: "text-right",
      render: (activity) => (
        <div className={styles.distanceCell}>{activity.distance}</div>
      ),
    },
    {
      key: "tss",
      header: "TSS",
      className: "text-right",
      render: (activity) => (
        <div className={styles.tssCell}>
          <span
            className={activity.tssClassName ?? styles.defaultTssBadge}
          >
            {activity.tss}
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <NavLink className={styles.viewAllLink} to={viewAllTo}>
          {viewAllLabel}
          <span className="material-symbols-outlined text-[16px]">
            arrow_forward
          </span>
        </NavLink>
      </div>

      <DataTable
        data={activities}
        columns={columns}
        rowKey={(activity) => activity.id}
        onRowClick={(activity) =>
          navigate(`/app/activities/${activity.id}`)
        }
        rowClassName={(_, index) => {
          const isLast = index === activities.length - 1;

          return `${
            isLast ? styles.lastRow : styles.row
          } cursor-pointer`;
        }}
      />
    </div>
  );
};

export default RecentActivitiesTable;