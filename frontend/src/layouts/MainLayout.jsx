import { useState } from "react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";

function MainLayout({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (

        <>

            <Navbar

                sidebarOpen={sidebarOpen}

                setSidebarOpen={setSidebarOpen}

            />

            <div className="d-flex">

                <Sidebar

                    sidebarOpen={sidebarOpen}

                    setSidebarOpen={setSidebarOpen}

                />

                <div

                    className="container-fluid p-4"

                    style={{

                        background:"#F8FAFC",

                        minHeight:"100vh"

                    }}

                >

                    {children}

                </div>

            </div>

        </>

    );

}

export default MainLayout;