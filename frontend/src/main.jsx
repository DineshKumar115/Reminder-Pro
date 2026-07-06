import React from "react";
import ReactDOM from "react-dom/client";
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import "./styles/global.css";
import "./styles/dashboard.css";
import "./styles/navbar.css";
import "./styles/sidebar.css";
import "./styles/reminder.css";


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);