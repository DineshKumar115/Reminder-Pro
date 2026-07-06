import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

import api from "../../services/api";

import {
    saveToken,
    saveUser
} from "../../utils/session";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        if (!email.trim()) {

            toast.error("Email is required");

            return;

        }

        if (!password.trim()) {

            toast.error("Password is required");

            return;

        }

        try {

            setLoading(true);

            const response = await api.post(

                "/auth/login",

                {

                    email: email.trim(),

                    password: password.trim()

                }

            );

            saveToken(response.data.access_token);

            saveUser(response.data.user);

            toast.success("Welcome back! 🎉");

            navigate("/");

        }

        catch (error) {

            toast.error(

                error.response?.data?.detail ||

                "Invalid email or password"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div

            className="d-flex justify-content-center align-items-center"

            style={{

                minHeight: "100vh",

                background: "linear-gradient(135deg,#4F46E5,#7C3AED)"

            }}

        >

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-lg-5 col-md-7">

                        <div

                            className="card border-0 shadow-lg"

                            style={{

                                borderRadius: "24px"

                            }}

                        >

                            <div className="card-body p-5">

                                <div className="text-center mb-4">

                                    <h1

                                        className="fw-bold"

                                        style={{

                                            color: "#4F46E5"

                                        }}

                                    >

                                        🚀 Reminder Pro

                                    </h1>

                                    <p className="text-muted">

                                        Smart Reminder Management

                                    </p>

                                </div>

                                <h3 className="fw-bold text-center mb-2">

                                    Welcome Back 👋

                                </h3>

                                <p className="text-center text-muted mb-4">

                                    Login to continue managing your reminders.

                                </p>

                                <form onSubmit={handleLogin}>

                                    <div className="mb-3">

                                        <label className="form-label">

                                            Email

                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text">

                                                <FaEnvelope />

                                            </span>

                                            <input

                                                type="email"

                                                className="form-control"

                                                placeholder="Enter your email"

                                                value={email}

                                                onChange={(e) =>

                                                    setEmail(e.target.value)

                                                }

                                                required

                                            />

                                        </div>

                                    </div>

                                    <div className="mb-4">

                                        <label className="form-label">

                                            Password

                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text">

                                                <FaLock />

                                            </span>

                                            <input

                                                type={

                                                    showPassword

                                                        ? "text"

                                                        : "password"

                                                }

                                                className="form-control"

                                                placeholder="Enter your password"

                                                value={password}

                                                onChange={(e) =>

                                                    setPassword(e.target.value)

                                                }

                                                required

                                            />

                                            <button

                                                type="button"

                                                className="btn btn-outline-secondary"

                                                onClick={() =>

                                                    setShowPassword(!showPassword)

                                                }

                                            >

                                                {

                                                    showPassword

                                                        ?

                                                        <FaEyeSlash />

                                                        :

                                                        <FaEye />

                                                }

                                            </button>

                                        </div>

                                    </div>

                                    <button

                                        className="btn btn-primary w-100 rounded-pill py-2"

                                        disabled={loading}

                                    >

                                        {

                                            loading

                                                ?

                                                "Logging In..."

                                                :

                                                "Login"

                                        }

                                    </button>

                                </form>

                                <hr className="my-4" />

                                <p className="text-center mb-0">

                                    Don't have an account?

                                    <Link

                                        to="/register"

                                        className="fw-bold text-decoration-none ms-2"

                                    >

                                        Register

                                    </Link>

                                </p>

                            </div>

                        </div>

                        <p className="text-center text-white mt-4">

                            © {new Date().getFullYear()} Reminder Pro

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;