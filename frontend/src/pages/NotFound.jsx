import { Link } from "react-router-dom";

function NotFound() {

    return (

        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                background: "#F8FAFC"
            }}
        >

            <div className="text-center">

                <h1
                    className="fw-bold"
                    style={{
                        fontSize: "120px",
                        color: "#4F46E5"
                    }}
                >

                    404

                </h1>

                <h2 className="fw-bold">

                    Page Not Found

                </h2>

                <p className="text-muted mb-4">

                    Sorry, the page you are looking for doesn't exist.

                </p>

                <Link
                    to="/"
                    className="btn btn-primary rounded-pill px-4"
                >

                    🏠 Go to Dashboard

                </Link>

            </div>

        </div>

    );

}

export default NotFound;