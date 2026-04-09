import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './index.scss';

const NavBar = () => {
    const { token } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    return (
        <div className="nav-bar">
            <div className="brand">
                <h1>Get In Touch</h1>
            </div>

            <div className="nav-container">
                <nav className="nav-links">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Home
                    </NavLink>

                    {token && (
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            Dashboard
                        </NavLink>
                    )}

                    {!token ? (
                        <NavLink
                            to="/login"
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            Login
                        </NavLink>
                    ) : (
                        <NavLink
                            to="/account"
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            Account
                        </NavLink>
                    )}
                </nav>
            </div>
        </div>
    );
};

export default NavBar;