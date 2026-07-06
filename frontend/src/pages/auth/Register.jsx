import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

import api from "../../services/api";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {

        e.preventDefault();

        if (!name.trim()) {

            toast.error("Name is required");

            return;

        }

        if (!email.trim()) {

            toast.error("Email is required");

            return;

        }

        if (!phoneNumber.trim()) {

            toast.error("Phone Number is required");

            return;

        }

        if (!password.trim()) {

            toast.error("Password is required");

            return;

        }

        try {

            setLoading(true);

            await api.post("/users/register", {

                name: name.trim(),

                email: email.trim(),

                password: password.trim(),

                phone_number: phoneNumber.trim()

            });

            toast.success("Registration Successful 🎉");

            navigate("/login");

        }

        catch (error) {

            toast.error(

                error.response?.data?.detail ||

                "Registration Failed"

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

                    <div className="col-lg-6 col-md-8">

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

                                <h3 className="fw-bold text-center">

                                    Create Account

                                </h3>

                                <p className="text-center text-muted mb-4">

                                    Join Reminder Pro and stay organized.

                                </p>

                                <form onSubmit={handleRegister}>

                                    <div className="mb-3">

                                        <label className="form-label">

                                            Full Name

                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text">

                                                <FaUser />

                                            </span>

                                            <input

                                                type="text"

                                                className="form-control"

                                                placeholder="Enter your name"

                                                value={name}

                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }

                                            />

                                        </div>

                                    </div>

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

                                            />

                                        </div>

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">

                                            Phone Number

                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text">

                                                <FaPhone />

                                            </span>

                                            <input

                                                type="text"

                                                className="form-control"

                                                placeholder="Enter phone number"

                                                value={phoneNumber}

                                                onChange={(e) =>
                                                    setPhoneNumber(e.target.value)
                                                }

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

                                                placeholder="Create password"

                                                value={password}

                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }

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

                                        className="btn btn-success w-100 rounded-pill py-2"

                                        disabled={loading}

                                    >

                                        {

                                            loading

                                                ?

                                                "Creating Account..."

                                                :

                                                "Create Account"

                                        }

                                    </button>

                                </form>

                                <hr className="my-4" />

                                <p className="text-center mb-0">

                                    Already have an account?

                                    <Link

                                        to="/login"

                                        className="fw-bold text-decoration-none ms-2"

                                    >

                                        Login

                                    </Link>

                                </p>

                            </div>

                        </div>

                        <p className="text-center text-white mt-4">

                            © 2026 Reminder Pro

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;