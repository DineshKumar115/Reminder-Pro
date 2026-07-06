import {
    FaHome,
    FaList,
    FaPlusCircle,
    FaSignOutAlt
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/session";

function Sidebar({

    sidebarOpen,
    setSidebarOpen

}) {

    const navigate = useNavigate();

    const logout = () => {

        removeToken();

        navigate("/login");

    };

    const navStyle = ({ isActive }) => ({

        display: "flex",

        alignItems: "center",

        gap: "14px",

        padding: "14px 18px",

        marginBottom: "10px",

        borderRadius: "12px",

        textDecoration: "none",

        fontWeight: isActive ? "600" : "500",

        background: isActive ? "#4F46E5" : "transparent",

        color: isActive ? "#ffffff" : "#d1d5db",

        transition: "all .3s"

    });

    return (

        <>

            {/* Mobile Overlay */}

            {

                sidebarOpen &&

                <div

                    className="sidebar-overlay d-lg-none"

                    onClick={() => setSidebarOpen(false)}

                />

            }

            <div

                className={`sidebar ${sidebarOpen ? "open" : ""}`}

            >

                {/* Top */}

                <div>

                    <div className="mb-5">

                        <h3

                            className="fw-bold"

                            style={{

                                color: "#ffffff"

                            }}

                        >

                            🚀 Reminder Pro

                        </h3>

                        <small

                            style={{

                                color: "#9CA3AF"

                            }}

                        >

                            Smart Reminder Management

                        </small>

                    </div>

                    <NavLink

                        to="/"

                        style={navStyle}

                        onClick={() => setSidebarOpen(false)}

                    >

                        <FaHome size={18} />

                        Dashboard

                    </NavLink>

                    <NavLink

                        to="/reminders"

                        style={navStyle}

                        onClick={() => setSidebarOpen(false)}

                    >

                        <FaList size={18} />

                        My Reminders

                    </NavLink>

                    <NavLink

                        to="/add-reminder"

                        style={navStyle}

                        onClick={() => setSidebarOpen(false)}

                    >

                        <FaPlusCircle size={18} />

                        Add Reminder

                    </NavLink>

                </div>

                {/* Bottom */}

                <div>

                    <hr style={{ borderColor: "#374151" }} />

                    <button

                        className="btn btn-danger rounded-pill w-100"

                        onClick={logout}

                    >

                        <FaSignOutAlt className="me-2" />

                        Logout

                    </button>

                </div>

            </div>

        </>

    );

}

export default Sidebar;