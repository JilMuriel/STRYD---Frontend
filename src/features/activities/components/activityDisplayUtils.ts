export const getActivityStyle = (activityType?: string) => {
  const typeMap: Record<string, { icon: string; bgClass: string; textClass: string }> = {
    ride: { icon: "directions_bike", bgClass: "bg-primary/10", textClass: "text-primary" },
    run: { icon: "directions_run", bgClass: "bg-secondary-container/10", textClass: "text-secondary-container" },
    walk: { icon: "directions_walk", bgClass: "bg-tertiary-container/10", textClass: "text-tertiary-container" },
    swim: { icon: "pool", bgClass: "bg-primary/10", textClass: "text-primary" },
  };

  return typeMap[activityType?.toLowerCase() || "ride"] || typeMap.ride;
};

export const formatDate = (dateString?: string) => {
  if (!dateString) return "Unknown";
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export const formatTime = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
};

export const formatDuration = (durationSeconds?: number) => {
  if (!durationSeconds) return "0m";
  const minutes = Math.floor(durationSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
};
