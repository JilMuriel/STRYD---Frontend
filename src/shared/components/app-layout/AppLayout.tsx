import type { ReactNode } from "react";
import AppLayoutHeader from "./AppLayoutHeader";
import AppLayoutLeftSidebar from "./AppLayoutLeftSidebar";
import AppLayoutRightSidebar from "./AppLayoutRightSidebar";
import { appLayoutSpacingVars } from "./appLayoutSpacing";

type AppLayoutProps = {
  children?: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen overflow-hidden bg-background font-sans text-on-background" style={appLayoutSpacingVars}>
      <div className="flex">
        <AppLayoutLeftSidebar />

        <main className="ml-[96px] mr-[300px] h-screen flex-1 overflow-y-auto px-[var(--ds-spacing-container-padding)] py-[var(--ds-spacing-xl)]">
          <div className="mx-auto max-w-[1200px] space-y-[var(--ds-spacing-lg)]">
            <AppLayoutHeader />
            {children}
          </div>
        </main>

        <AppLayoutRightSidebar />
      </div>
    </div>
  );
};

export default AppLayout;
