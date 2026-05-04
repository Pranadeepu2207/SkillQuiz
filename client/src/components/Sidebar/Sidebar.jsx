import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import './Sidebar.css';

const Sidebar = ({ onClick, hideTitleOnMobile }) => {
    return (
        <div className="sidebar-container d-flex flex-column h-100">
            <div className={`sidebar-brand p-4 ${hideTitleOnMobile ? 'd-none d-md-block' : ''}`}>
                <h4 className="fw-bold text-brand m-0">SkillQuiz</h4>
            </div>
            <div className="sidebar-nav px-3 flex-grow-1 d-flex flex-column justify-content-md-between">
                <div>
                    <Nav className="flex-column gap-2">

                        <NavLink
                            to="/"
                            onClick={onClick}
                            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                        >
                            <span className="icon">📚</span> Skills
                        </NavLink>

                        <NavLink
                            to="/profile"
                            onClick={onClick}
                            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                        >
                            <span className="icon">👤</span> Profile
                        </NavLink>

                        <NavLink
                            to="/leaderboard"
                            onClick={onClick}
                            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                        >
                            <span className="icon">🏆</span> Leaderboard
                        </NavLink>

                    </Nav>
                </div>
                <div>
                    <NavLink
                        to="/profile"
                        onClick={onClick}
                        className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                    >
                        <span className="icon">👤</span> Settings
                    </NavLink>

                    <NavLink
                        to="/leaderboard"
                        onClick={onClick}
                        className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                    >
                        <span className="icon">🏆</span> Logout
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;