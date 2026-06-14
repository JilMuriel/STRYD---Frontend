const ActivityTableHeader = () => (
  <div className="grid grid-cols-12 gap-md pb-md border-b border-surface-container-highest mb-sm">
    <div className="col-span-3 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Date</div>
    <div className="col-span-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Title</div>
    <div className="col-span-2 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-right">Distance</div>
    <div className="col-span-2 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-right">Time</div>
    <div className="col-span-1 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-right">TSS</div>
  </div>
);

export default ActivityTableHeader;
