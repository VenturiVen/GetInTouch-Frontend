import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AdminDashboard from "../pages/dashboard/admin";
import StaffDashboard from "../pages/dashboard/staff"
import StudentDashboard from "../pages/dashboard/student";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "dashboard", element: <AdminDashboard /> }, // temporary. add check for user type
            { path: "admindashboard", element: <AdminDashboard /> },
            { path: "staffdashboard", element: <StaffDashboard /> },
            { path: "studentdashboard", element: <StudentDashboard /> }
        ],
    }
]);

export default router;