import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../features/dashboard/DashboardPage";
import Login from "../features/login/Login";
import ProtectedRoute from "./ProtectedRoute";
import ActivityDetails from "../features/activities/ActivityDetailsPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: "/activities/:id",
        element: (
            <ProtectedRoute>
                <ActivityDetails />
            </ProtectedRoute>
        ),
    },
]);