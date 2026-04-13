import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from '../../../service/user/useUser';

import './index.scss';

const NavBar = () => {
    const { token, logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="nav-bar">
            <div className="brand">
                <h1>Get In Touch</h1>
            </div>

            <nav className="nav-links">
                <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
                    Home
                </NavLink>
                {token && (
                    <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
                        Dashboard
                    </NavLink>
                )}
                {token && (
                    <NavLink to="/messages" className={({ isActive }) => isActive ? "active" : ""}>
                        Messages
                    </NavLink>
                )}
            </nav>

            <div className="nav-right">
                {!token ? (
                    <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>
                        Login
                    </NavLink>
                ) : (
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
};

export default NavBar;
