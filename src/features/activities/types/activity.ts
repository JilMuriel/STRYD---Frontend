export type Activity = {
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
  date?: string;
  startTime?: string;
};

export type ActivityDetails = Activity & {
  insight: {
    type: string;
    fatigue: string;
    effort: string;
    message: string;
  };

  metric?: {
    ctl: number;
    atl: number;
    tsb: number;
  } | null;
};