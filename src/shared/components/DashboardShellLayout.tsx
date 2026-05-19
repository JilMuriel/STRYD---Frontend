import type { ReactNode } from "react";
import AppLayout from "./app-layout/AppLayout";

type DashboardShellLayoutProps = {
  children?: ReactNode;
};

const DashboardShellLayout = ({ children }: DashboardShellLayoutProps) => {
  return <AppLayout>{children}</AppLayout>;
};

export default DashboardShellLayout;