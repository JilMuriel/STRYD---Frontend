export type DashboardData = {
  metrics: {
    ctl: number;
    atl: number;
    tsb: number;
  };
  chart: {
    date: string;
    ctl: number;
    atl: number;
    tsb: number;
  }[];
  recentActivities: {
    id: string;
    name: string;
    distance: number;
    duration: number;
    tss: number;
    movingTime?: number;
    elevationGain?: number;
    intensityFactor?: number | null;
    averagePower?: number | null;
    averageSpeed?: number;
    activityType?: string;
  }[];
};