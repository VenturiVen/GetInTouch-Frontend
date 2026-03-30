import { createBrowserRouter } from "react-router-dom";
import Layout from "../presentation/pages/Layout";
import Home from "../presentation/pages/Home";
import Login from "../presentation/pages/Login";
import AdminDashboard from "../presentation/pages/dashboard/admin";
import StaffDashboard from "../presentation/pages/dashboard/staff"
import StudentDashboard from "../presentation/pages/dashboard/student";

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