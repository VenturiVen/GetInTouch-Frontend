import { createBrowserRouter } from "react-router-dom";
import Layout from "../ui/pages/Layout";
import Home from "../ui/pages/Home";
import Login from "../ui/pages/Login";
import Register from "../ui/pages/Register"
import Account from "../ui/pages/Account"
import AdminDashboard from "../ui/pages/dashboard/admin";
import StaffDashboard from "../ui/pages/dashboard/staff/StaffDashboard"
import StudentDashboard from "../ui/pages/dashboard/student/StudentDashboard";
import DashboardRouter from "../ui/pages/dashboard/DashboardRouter";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register />},
            { path: "account", element: <Account/>},
            { path: "dashboard", element: <DashboardRouter /> },
            { path: "dashboard/admin", element: <AdminDashboard /> },
            { path: "dashboard/staff", element: <StaffDashboard /> },
            { path: "dashboard/student", element: <StudentDashboard /> }
        ],
    }
]);

export default router;