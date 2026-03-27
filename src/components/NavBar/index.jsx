import { NavLink } from "react-router-dom";

import './index.scss';

const NavBar = () => {
    return (
        <div className="nav-bar">
            <div className="brand">
                {/* replace with UL logo maybe? couldnt find a transparent png */}
                <h1>Get In Touch</h1>
            </div>

            <div className="nav-container">
                <nav>
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Home
                    </NavLink>
                </nav>
                <nav>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Dashboard
                    </NavLink>
                </nav>
                <nav>
                    <NavLink
                        to="/login"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Login
                    </NavLink>
                </nav>
            </div>
        </div>
    );
};

export default NavBar;