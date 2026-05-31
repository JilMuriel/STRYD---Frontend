export type RideClassification = {
  type: string;
  icon: string;
  label: string;
  color: string;
};

export type RideClassificationInput = {
  distance?: number;
  movingTime?: number;
  duration?: number;
  elevationGain?: number;
  tss?: number;
  intensityFactor?: number | null;
  averagePower?: number | null;
  averageSpeed?: number;
  activityType?: string;
};

const rideClassifications = {
  recovery: {
    type: "recovery",
    icon: "favorite",
    label: "Recovery Ride",
    color: "bg-primary-container/10 text-primary",
  },
  endurance: {
    type: "endurance",
    icon: "directions_bike",
    label: "Endurance Ride",
    color: "bg-sky-100 text-sky-700",
  },
  sweetSpot: {
    type: "sweetSpot",
    icon: "bolt",
    label: "Sweet Spot Ride",
    color: "bg-amber-100 text-amber-700",
  },
  threshold: {
    type: "threshold",
    icon: "local_fire_department",
    label: "Threshold Ride",
    color: "bg-orange-100 text-orange-700",
  },
  vo2Max: {
    type: "vo2Max",
    icon: "rocket_launch",
    label: "VO2 Max Ride",
    color: "bg-purple-100 text-purple-700",
  },
  climbing: {
    type: "climbing",
    icon: "terrain",
    label: "Climbing Ride",
    color: "bg-slate-200 text-slate-700",
  },
  race: {
    type: "race",
    icon: "flag",
    label: "Race Effort",
    color: "bg-secondary-container/10 text-secondary",
  },
  defaultRide: {
    type: "ride",
    icon: "directions_bike",
    label: "Ride",
    color: "bg-primary-container/10 text-primary",
  },
} satisfies Record<string, RideClassification>;

const metersToKilometers = (distance?: number) => {
  if (!distance || distance <= 0) return 0;
  return distance / 1000;
};

const secondsToMinutes = (seconds?: number) => {
  if (!seconds || seconds <= 0) return 0;
  return seconds / 60;
};

const isBetweenInclusive = (value: number | null | undefined, min: number, max: number) => {
  if (value == null) return false;
  return value >= min && value <= max;
};

export const classifyRide = (activity: RideClassificationInput): RideClassification => {
  const tss = activity.tss ?? 0;
  const intensityFactor = activity.intensityFactor ?? null;
  const movingTime = activity.movingTime ?? activity.duration;
  const durationMinutes = secondsToMinutes(movingTime);
  const distanceKm = metersToKilometers(activity.distance);
  const elevationPerKm = distanceKm > 0 && activity.elevationGain ? activity.elevationGain / distanceKm : 0;

  if (tss > 150 || (intensityFactor != null && intensityFactor > 1.05)) {
    return rideClassifications.race;
  }

  if (intensityFactor != null && intensityFactor > 1 && durationMinutes > 0 && durationMinutes < 90) {
    return rideClassifications.vo2Max;
  }

  if (isBetweenInclusive(intensityFactor, 0.95, 1)) {
    return rideClassifications.threshold;
  }

  if (isBetweenInclusive(intensityFactor, 0.84, 0.94)) {
    return rideClassifications.sweetSpot;
  }

  if (elevationPerKm > 15) {
    return rideClassifications.climbing;
  }

  if (tss >= 30 && tss <= 90 && (intensityFactor == null || intensityFactor < 0.75)) {
    return rideClassifications.endurance;
  }

  if (tss > 0 && tss < 30) {
    return rideClassifications.recovery;
  }

  return rideClassifications.defaultRide;
};