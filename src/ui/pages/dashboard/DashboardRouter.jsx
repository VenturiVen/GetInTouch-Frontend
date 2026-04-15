import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const DashboardRouter = () => {
    const { token, role } = useSelector((state) => state.user);

    if (!token) {
        return <Navigate to="/login" />;
    }

    const roleName = role?.replace("ROLE_", "");

    if (roleName === "ADMIN") {
        return <Navigate to="/dashboard/admin" />;
    }

    if (roleName === "STAFF") {
        return <Navigate to="/dashboard/staff" />;
    }

    if (roleName === "STUDENT") {
        return <Navigate to="/dashboard/student" />;
    }

    return <Navigate to="/" />;
};

export default DashboardRouter;