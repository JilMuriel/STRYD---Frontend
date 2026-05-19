const AppLayoutRightSidebar = () => {
  return (
    <aside className="fixed right-0 top-0 z-40 h-full w-[300px] overflow-y-auto border-l border-outline-variant/10 bg-surface p-[var(--ds-spacing-lg)] shadow-sm">
      <div className="mb-[var(--ds-spacing-xl)] flex flex-col gap-[var(--ds-spacing-sm)]">
        <span className="text-h3 font-bold text-on-surface">Performance Engine</span>
        <span className="text-label-caps text-secondary">AI Analysis</span>
      </div>

      <div className="flex h-full flex-col gap-[var(--ds-spacing-md)] pb-[var(--ds-spacing-xl)]">
        <div className="mb-[var(--ds-spacing-lg)] flex flex-col gap-[var(--ds-spacing-sm)]">
          <a href="#" className="flex items-center gap-[var(--ds-spacing-md)] rounded-xl bg-secondary-container/10 p-[var(--ds-spacing-md)] font-semibold text-secondary">
            <span className="material-symbols-outlined">calendar_month</span>
            Weekly Summary
          </a>
          <a href="#" className="flex items-center gap-[var(--ds-spacing-md)] rounded-xl p-[var(--ds-spacing-md)] text-on-surface-variant transition-colors hover:bg-surface-container-high">
            <span className="material-symbols-outlined">psychology</span>
            AI Insights
          </a>
          <a href="#" className="flex items-center gap-[var(--ds-spacing-md)] rounded-xl p-[var(--ds-spacing-md)] text-on-surface-variant transition-colors hover:bg-surface-container-high">
            <span className="material-symbols-outlined">refresh</span>
            Recovery
          </a>
        </div>

        <hr className="mb-[var(--ds-spacing-sm)] border-outline-variant/20" />

        <div className="rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-[var(--ds-spacing-md)] shadow-sm">
          <div className="mb-[var(--ds-spacing-sm)] flex items-center gap-[var(--ds-spacing-sm)] text-primary">
            <span className="material-symbols-outlined text-sm">bolt</span>
            <span className="text-label-caps">Fitness Gains</span>
          </div>
          <p className="mb-[var(--ds-spacing-xs)] text-body-md font-semibold text-on-surface">Your fitness improved by 12%</p>
          <p className="text-body-sm text-on-surface-variant">Consistent Z2 work over the last 3 weeks is showing positive physiological adaptations.</p>
        </div>

        <div className="mt-[var(--ds-spacing-sm)] rounded-xl border border-secondary-container/10 bg-secondary-container/5 p-[var(--ds-spacing-md)] shadow-sm">
          <div className="mb-[var(--ds-spacing-sm)] flex items-center gap-[var(--ds-spacing-sm)] text-secondary">
            <span className="material-symbols-outlined text-sm">medical_services</span>
            <span className="text-label-caps">Recovery Alert</span>
          </div>
          <p className="mb-[var(--ds-spacing-xs)] text-body-md font-semibold text-on-surface">Consider a recovery ride tomorrow.</p>
          <p className="text-body-sm text-on-surface-variant">Form (TSB) is dipping low (-23.7). A 45 min light spin under 120W is recommended.</p>
        </div>

        <div className="mt-auto pt-[var(--ds-spacing-lg)]">
          <button className="flex h-12 w-full items-center mb-5 justify-center gap-[var(--ds-spacing-sm)] rounded-xl bg-on-surface font-bold text-surface transition-colors hover:bg-on-surface-variant">
            <span className="material-symbols-outlined text-sm">tune</span>
            Optimise Training
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AppLayoutRightSidebar;
