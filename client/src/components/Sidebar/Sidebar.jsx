import { Nav, Modal, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

import './Sidebar.css';
import { useState } from "react";

const Sidebar = ({ onClick, hideTitleOnMobile }) => {
    const [show, setShow] = useState(false)
    const handleLogout = () => {
        setShow(true)
    }

    const handleClose = () => setShow(false);

    const navigate = useNavigate()

    return (
        <>
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

                        <button
                            className="sidebar-link logout-btn"
                            onClick={handleLogout}
                        >
                            <span className="icon">⏻</span> Logout
                        </button>
                    </div>
                </div>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Body className="fs-5" style={{ fontWeight: "bold" }}>
                    Are you sure you want to Logout?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={() => {
                        navigate("/login")
                        localStorage.clear()
                    }} variant="danger">Logout</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Sidebar;