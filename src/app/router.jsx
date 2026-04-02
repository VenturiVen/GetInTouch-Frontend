import { createBrowserRouter } from "react-router-dom";
import Layout from "../ui/pages/Layout";
import Home from "../ui/pages/Home";
import Login from "../ui/pages/Login";
import AdminDashboard from "../ui/pages/dashboard/admin";
import StaffDashboard from "../ui/pages/dashboard/staff"
import StudentDashboard from "../ui/pages/dashboard/student/StudentDashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "dashboard/admin", element: <AdminDashboard /> },
            { path: "dashboard/staff", element: <StaffDashboard /> },
            { path: "dashboard/student", element: <StudentDashboard /> }
        ],
    }
]);

export default router;