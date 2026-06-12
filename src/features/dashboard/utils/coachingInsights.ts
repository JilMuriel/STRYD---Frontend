export type CoachingMetrics = {
  currentCTL: number;
  currentATL: number;
  currentTSB: number;
  ctl14DaysAgo: number;
  ctl28DaysAgo: number;
  weeklyTSS: number[];
  projectedCTL?: number;
};

export type InsightCard = {
  title: string;
  description: string;
  severity: "positive" | "neutral" | "warning";
};

export type CoachingInsights = {
  fitnessTrend: InsightCard;
  fatigueTrend: InsightCard;
  readiness: InsightCard;
  projectedCTL: InsightCard;
  recovery: InsightCard;
};

export const FITNESS_TREND_THRESHOLDS = {
  rapidGain: 5,
  steadyGain: 2,
  maintenanceFloor: -2,
} as const;

export const FATIGUE_GAP_THRESHOLDS = {
  excessive: 30,
  high: 15,
  moderate: 0,
} as const;

export const READINESS_TSB_THRESHOLDS = {
  fresh: 10,
  ready: -10,
  heavyLoad: -25,
} as const;

export const RECOVERY_TSB_THRESHOLDS = {
  restDay: -30,
  activeRecovery: -20,
} as const;

export const PROJECTION_CONSTANTS = {
  daysPerWeek: 7,
  ctlTimeConstantDays: 42,
  projectionDays: 14,
} as const;

const fallbackInsight = (title: string, description: string): InsightCard => ({
  title,
  description,
  severity: "neutral",
});

export const isFiniteNumber = (value: number | undefined): value is number =>
  typeof value === "number" && Number.isFinite(value);

export const calculateFitnessTrend = (currentCTL: number, ctl14DaysAgo: number): InsightCard => {
  if (!isFiniteNumber(currentCTL) || !isFiniteNumber(ctl14DaysAgo)) {
    return fallbackInsight("Fitness trend unavailable", "More historical training data is needed.");
  }

  const ctlDifference = currentCTL - ctl14DaysAgo;

  // CTL reflects long-term adaptation. A fast 14-day rise suggests strong stimulus,
  // but rapid load growth increases the need to protect recovery capacity.
  if (ctlDifference >= FITNESS_TREND_THRESHOLDS.rapidGain) {
    return {
      title: "Improving rapidly",
      description: "Your long-term fitness is increasing quickly. Ensure recovery is adequate to sustain adaptations.",
      severity: "positive",
    };
  }

  // A moderate CTL increase usually indicates sustainable overload and productive consistency.
  if (ctlDifference >= FITNESS_TREND_THRESHOLDS.steadyGain) {
    return {
      title: "Improving steadily",
      description: "Your training load is supporting consistent fitness gains.",
      severity: "positive",
    };
  }

  // Small CTL changes are normal during maintenance blocks, travel weeks, or taper periods.
  if (ctlDifference > FITNESS_TREND_THRESHOLDS.maintenanceFloor) {
    return {
      title: "Maintaining fitness",
      description: "You are preserving current fitness levels.",
      severity: "neutral",
    };
  }

  // A meaningful CTL drop means recent workload is not replacing prior training stimulus.
  return {
    title: "Fitness declining",
    description: "Reduced training stimulus may lead to fitness losses.",
    severity: "warning",
  };
};

export const calculateFatigueTrend = (currentATL: number, currentCTL: number): InsightCard => {
  if (!isFiniteNumber(currentATL) || !isFiniteNumber(currentCTL)) {
    return fallbackInsight("Fatigue trend unavailable", "More current load data is needed.");
  }

  const fatigueGap = currentATL - currentCTL;

  // ATL above CTL means short-term load is outpacing established fitness.
  // Large gaps often precede suppressed readiness and higher recovery demand.
  if (fatigueGap >= FATIGUE_GAP_THRESHOLDS.excessive) {
    return {
      title: "Excessive fatigue",
      description: "Your acute training load is significantly elevated.",
      severity: "warning",
    };
  }

  if (fatigueGap >= FATIGUE_GAP_THRESHOLDS.high) {
    return {
      title: "High accumulation",
      description: "Fatigue is building and should be monitored.",
      severity: "warning",
    };
  }

  if (fatigueGap >= FATIGUE_GAP_THRESHOLDS.moderate) {
    return {
      title: "Moderate load",
      description: "Current fatigue is within expected limits.",
      severity: "neutral",
    };
  }

  return {
    title: "Low fatigue",
    description: "You appear well recovered.",
    severity: "positive",
  };
};

export const calculateReadiness = (currentTSB: number): InsightCard => {
  if (!isFiniteNumber(currentTSB)) {
    return fallbackInsight("Readiness unavailable", "More form data is needed.");
  }

  // TSB compares fitness and fatigue. Positive values often indicate freshness,
  // while deeply negative values imply accumulated fatigue from recent training.
  if (currentTSB > READINESS_TSB_THRESHOLDS.fresh) {
    return {
      title: "Fresh",
      description: "You are likely prepared for high-quality efforts.",
      severity: "positive",
    };
  }

  if (currentTSB >= READINESS_TSB_THRESHOLDS.ready) {
    return {
      title: "Ready",
      description: "You appear balanced and ready to train.",
      severity: "positive",
    };
  }

  if (currentTSB >= READINESS_TSB_THRESHOLDS.heavyLoad) {
    return {
      title: "Heavy load",
      description: "You are carrying substantial fatigue.",
      severity: "neutral",
    };
  }

  return {
    title: "Recovery needed",
    description: "Additional recovery may improve readiness.",
    severity: "warning",
  };
};

export const calculateAverageWeeklyTSS = (weeklyTSS: number[]): number => {
  const validWeeks = weeklyTSS.filter(isFiniteNumber);
  if (validWeeks.length === 0) return 0;

  return validWeeks.reduce((total, tss) => total + tss, 0) / validWeeks.length;
};

export const estimateProjectedCTL = (currentCTL: number, weeklyTSS: number[]): number => {
  if (!isFiniteNumber(currentCTL)) return 0;

  const averageWeeklyTSS = calculateAverageWeeklyTSS(weeklyTSS);

  // CTL is a long-term rolling load estimate. This lightweight projection converts
  // average weekly stress to daily stress and applies a 42-day fitness time constant.
  return (
    currentCTL +
    ((averageWeeklyTSS / PROJECTION_CONSTANTS.daysPerWeek) / PROJECTION_CONSTANTS.ctlTimeConstantDays) *
      PROJECTION_CONSTANTS.projectionDays
  );
};

export const calculateProjectedCTLInsight = (metrics: CoachingMetrics): InsightCard => {
  const projectedCTL = isFiniteNumber(metrics.projectedCTL)
    ? metrics.projectedCTL
    : estimateProjectedCTL(metrics.currentCTL, metrics.weeklyTSS);

  if (!isFiniteNumber(projectedCTL)) {
    return fallbackInsight("Projection unavailable", "More workload data is needed to estimate future fitness.");
  }

  return {
    title: `Projected CTL ${Math.round(projectedCTL)}`,
    description: "At your current workload, this fitness level may be reached in approximately 14 days.",
    severity: "positive",
  };
};

export const calculateRecoveryRecommendation = (currentTSB: number): InsightCard => {
  if (!isFiniteNumber(currentTSB)) {
    return fallbackInsight("Recovery guidance unavailable", "More readiness data is needed.");
  }

  // Recovery guidance is driven by TSB because it captures the balance between
  // accumulated fitness and short-term fatigue.
  if (currentTSB <= RECOVERY_TSB_THRESHOLDS.restDay) {
    return {
      title: "Rest day recommended",
      description: "Consider taking 1-2 recovery days.",
      severity: "warning",
    };
  }

  if (currentTSB <= RECOVERY_TSB_THRESHOLDS.activeRecovery) {
    return {
      title: "Active recovery advised",
      description: "A light Zone 1-2 session may help absorb training stress.",
      severity: "neutral",
    };
  }

  return {
    title: "Training may continue",
    description: "Current readiness supports planned training.",
    severity: "positive",
  };
};

export const generateCoachingInsights = (metrics: CoachingMetrics): CoachingInsights => ({
  fitnessTrend: calculateFitnessTrend(metrics.currentCTL, metrics.ctl14DaysAgo),
  fatigueTrend: calculateFatigueTrend(metrics.currentATL, metrics.currentCTL),
  readiness: calculateReadiness(metrics.currentTSB),
  projectedCTL: calculateProjectedCTLInsight(metrics),
  recovery: calculateRecoveryRecommendation(metrics.currentTSB),
});
