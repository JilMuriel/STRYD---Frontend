import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../../../api/auth";
import { clearUserDataCache } from "../../../app/queryClient";

const navItemClassName = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "flex flex-col items-center gap-[var(--ds-spacing-sm)] rounded-xl p-[var(--ds-spacing-sm)] text-primary"
    : "flex flex-col items-center gap-[var(--ds-spacing-sm)] rounded-xl p-[var(--ds-spacing-sm)] text-outline hover:text-primary";

const AppLayoutLeftSidebar = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isProfileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!profileMenuRef.current?.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await logout();
    } finally {
      clearUserDataCache();
      window.location.href = "/";
    }
  };

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
          <NavLink to="/app/dashboard" className={navItemClassName}>
            <div className="rounded-xl bg-primary-container/20 p-[var(--ds-spacing-sm)]">
              <span className="material-symbols-outlined">dashboard</span>
            </div>
            <span className="text-label-caps">Dashboard</span>
          </NavLink>

          <NavLink to="/app/activities" className={navItemClassName}>
            <span className="material-symbols-outlined">directions_bike</span>
            <span className="mt-[var(--ds-spacing-xs)] text-label-caps">Activities</span>
          </NavLink>

          <NavLink to="/app/analytics" className={navItemClassName}>
            <span className="material-symbols-outlined">analytics</span>
            <span className="mt-[var(--ds-spacing-xs)] text-label-caps">Analytics</span>
          </NavLink>

          <NavLink to="/app/settings" className={navItemClassName}>
            <span className="material-symbols-outlined">settings</span>
            <span className="mt-[var(--ds-spacing-xs)] text-label-caps">Settings</span>
          </NavLink>
        </div>

        <div ref={profileMenuRef} className="relative mt-auto">
          <button
            type="button"
            aria-expanded={isProfileMenuOpen}
            aria-haspopup="menu"
            onClick={() => setIsProfileMenuOpen((current) => !current)}
            className="flex flex-col items-center gap-[var(--ds-spacing-sm)] rounded-xl p-[var(--ds-spacing-sm)] text-outline hover:text-primary"
          >
            <img
              alt="Profile"
              className="h-10 w-10 rounded-full border-2 border-surface object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNWKDrALeRQDNMkhBkFW_7BI26x4bolK5zqX0UT6h7y0gwqms5pDj5PKySCdVrZ5POsqqhgqw4_Eaz2lj_5aaw-QPfhtnqxrWnC9q3FVK0dgX6A7mJlE1y77L3SyLi9vZfgqn6mQnxlT6X4R4ur_AikY9oK6xojIHgMwoI3zVnqoTNttzFZNoasavDxgM1J6LP_vy3XtzGosT5_OAuUqjNpi21u0JydxufN8eu1bospry_Z9eCoFRSEFTPFnvUwGGzSWbsTLiVqcg"
            />
            <span className="mt-[var(--ds-spacing-xs)] text-label-caps">Profile</span>
          </button>

          {isProfileMenuOpen && (
            <div
              role="menu"
              className="absolute bottom-0 left-full ml-[var(--ds-spacing-md)] w-48 rounded-lg border border-outline-variant/20 bg-surface p-[var(--ds-spacing-sm)] shadow-lg"
            >
              <NavLink
                to="/app/settings"
                role="menuitem"
                onClick={() => setIsProfileMenuOpen(false)}
                className="flex items-center gap-[var(--ds-spacing-sm)] rounded-md px-[var(--ds-spacing-md)] py-[var(--ds-spacing-sm)] text-body-sm text-on-surface hover:bg-surface-container-high"
              >
                <span className="material-symbols-outlined text-[18px]">settings</span>
                Settings
              </NavLink>

              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="mt-[var(--ds-spacing-xs)] flex w-full items-center gap-[var(--ds-spacing-sm)] rounded-md px-[var(--ds-spacing-md)] py-[var(--ds-spacing-sm)] text-left text-body-sm text-secondary hover:bg-secondary-container/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AppLayoutLeftSidebar;
