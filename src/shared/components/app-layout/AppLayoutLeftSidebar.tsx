const AppLayoutLeftSidebar = () => {
  return (
    <nav className="fixed left-0 top-0 z-50 flex h-full w-[96px] flex-col items-center bg-surface px-[var(--ds-spacing-sm)] py-[var(--ds-spacing-xl)] shadow-sm">
      <div className="mb-[var(--ds-spacing-xl)] flex flex-col items-center justify-center">
        <div className="mb-[var(--ds-spacing-sm)] flex h-12 w-12 items-center justify-center rounded-full bg-primary-container">
          <span className="material-symbols-outlined text-on-primary-container">pedal_bike</span>
        </div>
        <span className="text-h2 font-bold text-primary">STRYD</span>
        <span className="text-label-caps text-on-surface-variant">Elite</span>
      </div>

      <div className="flex h-full flex-col items-center justify-between gap-[var(--ds-spacing-lg)]">
        <div className="flex flex-col items-center gap-[var(--ds-spacing-lg)]">
          <a href="#" className="flex scale-110 flex-col items-center gap-[var(--ds-spacing-sm)] text-primary transition-transform">
            <div className="rounded-xl bg-primary-container/20 p-[var(--ds-spacing-sm)]">
              <span className="material-symbols-outlined">dashboard</span>
            </div>
            <span className="text-label-caps">Dashboard</span>
          </a>

          <a href="#" className="flex flex-col items-center gap-[var(--ds-spacing-sm)] rounded-xl p-[var(--ds-spacing-sm)] text-outline transition-colors hover:text-primary">
            <span className="material-symbols-outlined">directions_bike</span>
            <span className="mt-[var(--ds-spacing-xs)] text-label-caps">Activities</span>
          </a>

          <a href="#" className="flex flex-col items-center gap-[var(--ds-spacing-sm)] rounded-xl p-[var(--ds-spacing-sm)] text-outline transition-colors hover:text-primary">
            <span className="material-symbols-outlined">analytics</span>
            <span className="mt-[var(--ds-spacing-xs)] text-label-caps">Analytics</span>
          </a>

          <a href="#" className="flex flex-col items-center gap-[var(--ds-spacing-sm)] rounded-xl p-[var(--ds-spacing-sm)] text-outline transition-colors hover:text-primary">
            <span className="material-symbols-outlined">settings</span>
            <span className="mt-[var(--ds-spacing-xs)] text-label-caps">Settings</span>
          </a>
        </div>

        <div className="mt-auto">
          <a href="#" className="flex flex-col items-center gap-[var(--ds-spacing-sm)] rounded-xl p-[var(--ds-spacing-sm)] text-outline transition-colors hover:text-primary">
            <img
              alt="Profile"
              className="h-10 w-10 rounded-full border-2 border-surface object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNWKDrALeRQDNMkhBkFW_7BI26x4bolK5zqX0UT6h7y0gwqms5pDj5PKySCdVrZ5POsqqhgqw4_Eaz2lj_5aaw-QPfhtnqxrWnC9q3FVK0dgX6A7mJlE1y77L3SyLi9vZfgqn6mQnxlT6X4R4ur_AikY9oK6xojIHgMwoI3zVnqoTNttzFZNoasavDxgM1J6LP_vy3XtzGosT5_OAuUqjNpi21u0JydxufN8eu1bospry_Z9eCoFRSEFTPFnvUwGGzSWbsTLiVqcg"
            />
            <span className="mt-[var(--ds-spacing-xs)] text-label-caps">Profile</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default AppLayoutLeftSidebar;
