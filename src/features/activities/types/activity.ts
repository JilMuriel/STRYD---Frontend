export type ActivityDetails = {
  id: string;
  name: string;
  distance: number;
  duration: number;
  tss: number;
  avgPower?: number | null;

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