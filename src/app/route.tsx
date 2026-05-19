import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../features/dashboard/DashboardPage";
import Login from "../features/login/Login";
import ProtectedRoute from "./ProtectedRoute";
import ActivityDetails from "../features/activities/ActivityDetailsPage";
import { AppLayout } from "../shared/components/app-layout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <AppLayout >
                    <Dashboard />
                </AppLayout >
            </ProtectedRoute>
        ),
    },
    {
        path: '/test',
        element: (
            <AppLayout />
        )
    },
    {
        path: "/activities/:id",
        element: (
            <ProtectedRoute>
                <AppLayout >
                    <ActivityDetails />
                </AppLayout >
            </ProtectedRoute>
        ),
    },
]);