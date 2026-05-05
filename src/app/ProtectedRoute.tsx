import { Navigate } from "react-router-dom";
import { useDashboard } from "../features/dashboard/hooks/useDashboard";
import LoadingScreen from '../shared/components/LoadingSpinner';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { data, isLoading, isError } = useDashboard();

    console.log("isError", isError);
    console.log("data", data);

    if (isLoading) return <LoadingScreen />;

    // ✅ FIRST: handle error (unauthorized)
    if (isError) {
        return <Navigate to="/" replace />;
    }

    // ✅ THEN: handle no data
    if (!data) {
        return <div>No data</div>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;