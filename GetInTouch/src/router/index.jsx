import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import AdminDashboard from '../pages/dashboard/admin/AdminDashboard';
import StaffDashboard from '../pages/dashboard/staff/StaffDashboard';
import StudentDashboard from '../pages/dashboard/student/StudentDashboard';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/admin-dashboard',
        element: <AdminDashboard />,
    },
    {
        path: '/staff-dashboard',
        element: <StaffDashboard />,
    },
    {
        path: '/student-dashboard',
        element: <StudentDashboard />,
    },
]);

export default router;
