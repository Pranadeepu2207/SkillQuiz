import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import Sidebar from "../../components/Sidebar/Sidebar";

import './Dashboard.css';

const DashboardLayout = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="d-flex dashboard-wrapper">
            <div className="d-none d-md-block desktop-sidebar border-end bg-white">
                <Sidebar />
            </div>

            <div className="flex-grow-1 bg-light main-content">
                <div className="d-md-none mobile-topbar bg-white border-bottom px-3 py-2 d-flex justify-content-between align-items-center sticky-top">
                    <div className="d-flex align-items-center gap-3">
                        <button className="hamburger-btn" onClick={handleShow}>
                            ☰
                        </button>
                        <h5 className="m-0 fw-bold text-brand">SkillQuiz</h5>
                    </div>

                    <img
                        src="https://i.pravatar.cc/40"
                        alt="profile"
                        className="mobile-profile"
                    />
                </div>

                {/* DYNAMIC PAGE CONTENT */}
                <div className="p-4 outlet-bg-container">
                    <Outlet />
                </div>
            </div>

            {/* MOBILE OFFCANVAS SIDEBAR */}
            {/* REMOVED: responsive="md" so it stops rendering inline on desktop */}
            <Offcanvas show={show} onHide={handleClose} placement="start">
                <Offcanvas.Header closeButton className="border-bottom">
                    <Offcanvas.Title className="fw-bold text-brand">SkillQuiz</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body className="p-0">
                    <Sidebar onClick={handleClose} hideTitleOnMobile={true} />
                </Offcanvas.Body>
            </Offcanvas>

        </div>
    );
};

export default DashboardLayout;