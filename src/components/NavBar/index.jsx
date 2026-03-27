import { NavLink } from "react-router-dom";

import './index.scss';

const NavBar = () => {
    return (
        <div className="nav-bar">

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