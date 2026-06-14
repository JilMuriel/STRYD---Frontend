import type { ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AppLayoutHeader from "./AppLayoutHeader";
import AppLayoutLeftSidebar from "./AppLayoutLeftSidebar";
import AppLayoutRightSidebar from "./AppLayoutRightSidebar";
import { appLayoutSpacingVars } from "./appLayoutSpacing";

type AppLayoutProps = {
  children?: ReactNode;
};

const headerConfig: Record<
  string,
  {
    title: string;
    description: string;
  }
> = {
  "/app/dashboard": {
    title: "Cycling Progress",
    description: "Your performance analytics at a glance.",
  },
  "/app/activities": {
    title: "Activities",
    description: "Review and analyze your recent cycling performance",
  },
  "/app/analytics": {
    title: "Analytics",
    description: "Review and analyze your recent cycling performance",
  },
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();

  const header =
    headerConfig[location.pathname] ?? {
      title: "",
      description: "",
    };

  const hideRightSidebar = location.pathname === "/app/activities";

  return (
    <div
      className="min-h-screen overflow-hidden bg-background font-sans text-on-background"
      style={appLayoutSpacingVars}
    >
      <div className="flex">
        <AppLayoutLeftSidebar />

        <main
          className={`ml-[96px] h-screen flex-1 overflow-y-auto px-[var(--ds-spacing-container-padding)] py-[var(--ds-spacing-xl)] ${hideRightSidebar ? "" : "mr-[300px]"
            }`}
        >
          <div className="mx-auto max-w-[1200px] space-y-[var(--ds-spacing-lg)]">
            <AppLayoutHeader
              title={header.title}
              description={header.description}
            />

            {children ?? <Outlet />}
          </div>
        </main>

        {!hideRightSidebar && <AppLayoutRightSidebar />}
      </div>
    </div>
  );
};

export default AppLayout;