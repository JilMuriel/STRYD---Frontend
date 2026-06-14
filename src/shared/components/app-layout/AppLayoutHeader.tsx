type AppLayoutHeaderProps = {
  title: string;
  description: string;
};

const AppLayoutHeader = ({ title, description }: AppLayoutHeaderProps) => {
  return (
    <header className="mb-[var(--ds-spacing-xl)] flex items-end justify-between">
      <div>
        <h1 className="mb-[var(--ds-spacing-xs)] text-h1 font-medium">{title}</h1>
        <p className="text-body-md text-on-surface-variant">{description}</p>
      </div>
      <div className="flex gap-[var(--ds-spacing-md)]">
        <button className="flex h-12 items-center gap-[var(--ds-spacing-sm)] rounded-full bg-secondary-container/10 px-[var(--ds-spacing-lg)] font-semibold text-secondary transition-colors hover:bg-secondary-container/20">
          <span className="material-symbols-outlined">download</span>
          Export
        </button>
        <button className="h-12 rounded-full bg-primary-container px-[var(--ds-spacing-lg)] font-semibold text-on-primary-container transition-opacity hover:opacity-90">
          Add Workout
        </button>
      </div>
    </header>
  );
};

export default AppLayoutHeader;
