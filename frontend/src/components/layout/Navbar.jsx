import {
    FaBars,
    FaSignOutAlt
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import {
    getUser,
    removeToken,
    removeUser
} from "../../utils/session";

function Navbar({

    sidebarOpen,
    setSidebarOpen

}) {

    const navigate = useNavigate();

    const user = getUser();

    const logout = () => {

        removeToken();

        removeUser();

        navigate("/login");

    };

    const today = new Date().toLocaleDateString(

        "en-US",

        {

            weekday: "long",

            day: "numeric",

            month: "long",

            year: "numeric"

        }

    );

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) {

        greeting = "Good Morning";

    }

    else if (hour < 17) {

        greeting = "Good Afternoon";

    }

    const getInitial = () => {

        if (!user?.name) {

            return "U";

        }

        return user.name.charAt(0).toUpperCase();

    };

    return (

        <nav

            className="navbar navbar-expand-lg px-4 shadow-sm"

            style={{

                background: "#ffffff",

                borderBottom: "1px solid #ececec",

                height: "75px",

                position: "sticky",

                top: 0,

                zIndex: 1000

            }}

        >

            <div className="container-fluid">

                {/* Left */}

                <div className="d-flex align-items-center">

                    <button

                        className="btn btn-light me-3 d-lg-none"

                        onClick={() =>

                            setSidebarOpen(!sidebarOpen)

                        }

                    >

                        <FaBars />

                    </button>

                    <div>

                        <h3

                            className="fw-bold mb-0"

                            style={{

                                color: "#4F46E5"

                            }}

                        >

                            🚀 Reminder Pro

                        </h3>

                        <small className="text-muted">

                            {greeting} 👋

                            <span className="ms-2">

                                {today}

                            </span>

                        </small>

                    </div>

                </div>

                {/* Right */}

                <div className="d-flex align-items-center gap-3">

                    <div

                        className="rounded-circle"

                        style={{

                            width: "45px",

                            height: "45px",

                            background: "#4F46E5",

                            color: "#fff",

                            display: "flex",

                            alignItems: "center",

                            justifyContent: "center",

                            fontWeight: "700",

                            fontSize: "18px"

                        }}

                    >

                        {getInitial()}

                    </div>

                    <div className="d-none d-md-block">

                        <div

                            className="fw-bold"

                            style={{

                                fontSize: "15px"

                            }}

                        >

                            {

                                user?.name ||

                                "Guest User"

                            }

                        </div>

                        <small className="text-muted">

                            {

                                user?.email ||

                                ""

                            }

                        </small>

                    </div>

                    <button

                        className="btn btn-outline-danger rounded-pill px-3"

                        onClick={logout}

                    >

                        <FaSignOutAlt className="me-2" />

                        <span className="d-none d-lg-inline">

                            Logout

                        </span>

                    </button>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;