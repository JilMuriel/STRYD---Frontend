import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Dashboard from "../features/dashboard/DashboardPage";
import Login from "../features/login/Login";
import ProtectedRoute from "./ProtectedRoute";
import ActivityDetails from "../features/activities/ActivityDetailsPage";
import { AppLayout } from "../shared/components/app-layout";
import ActivitiesPage from "../features/activities/ActivitiesPage";
import AnalyticsPage from "../features/analytics/AnalyticsPage";
import SettingsPage from "../features/settings/SettingsPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/dashboard",
        element: <Navigate to="/app/dashboard" replace />,
    },
    {
        path: "/activities",
        element: <Navigate to="/app/activities" replace />,
    },
    {
        path: "/analytics",
        element: <Navigate to="/app/analytics" replace />,
    },
    {
        path: "/settings",
        element: <Navigate to="/app/settings" replace />,
    },
    {
        path: "/app",
        element: (
            <ProtectedRoute>
                <AppLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "activities",
                element: <ActivitiesPage />,
            },
            {
                path: "analytics",
                element: <AnalyticsPage />,
            },
            {
                path: "settings",
                element: <SettingsPage />,
            },
        ],
    },
    {
        path: "/app/activities/:id",
        element: (
            <ProtectedRoute>
                <AppLayout>
                    <ActivityDetails />
                </AppLayout>
            </ProtectedRoute>
        ),
    },
]);