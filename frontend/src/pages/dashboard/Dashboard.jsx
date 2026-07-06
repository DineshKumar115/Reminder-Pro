import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FaClipboardList,
    FaCalendarDay,
    FaClock
} from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/common/Loader";
import StatCard from "../../components/common/StatCard";

import { getDashboardStats } from "../../services/reminderService";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadDashboard = async () => {

        try {

            const response = await getDashboardStats();

            setDashboard(response.data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadDashboard();

    }, []);

    if (loading) {

        return <Loader />;

    }

    return (

        <MainLayout>

            {/* Hero */}

            <div
                className="p-4 rounded-4 mb-4 text-white"
                style={{
                    background: "linear-gradient(135deg,#4F46E5,#6366F1)"
                }}
            >

                <h2 className="fw-bold">

                    👋 Welcome Back

                </h2>

                <p className="mb-0">

                    Stay organized and never miss an important reminder.

                </p>

            </div>

            {/* Statistics */}

            <div className="row mb-4">

                <div className="col-lg-4 mb-3">

                    <StatCard

                        title="Total Reminders"

                        value={dashboard.total_reminders}

                        subtitle="All reminders"

                        color="#4F46E5"

                        icon={<FaClipboardList />}

                    />

                </div>

                <div className="col-lg-4 mb-3">

                    <StatCard

                        title="Today's Reminders"

                        value={dashboard.today_reminders}

                        subtitle="Today's schedule"

                        color="#16A34A"

                        icon={<FaCalendarDay />}

                    />

                </div>

                <div className="col-lg-4 mb-3">

                    <StatCard

                        title="Upcoming"

                        value={dashboard.upcoming_reminders}

                        subtitle="Future reminders"

                        color="#DC2626"

                        icon={<FaClock />}

                    />

                </div>

            </div>

            {/* Quick Actions */}

            <div className="card shadow-sm border-0 mb-4">

                <div className="card-body">

                    <h4 className="fw-bold mb-4">

                        🚀 Quick Actions

                    </h4>

                    <div className="d-flex flex-wrap gap-3">

                        <Link

                            to="/add-reminder"

                            className="btn btn-primary rounded-pill px-4"

                        >

                            ➕ Add Reminder

                        </Link>

                        <Link

                            to="/reminders"

                            className="btn btn-outline-primary rounded-pill px-4"

                        >

                            📋 View Reminders

                        </Link>

                    </div>

                </div>

            </div>

            {/* Today's Reminders */}

            <div className="card shadow-sm border-0">

                <div className="card-body">

                    <h4 className="fw-bold mb-4">

                        🔥 Today's Reminders

                    </h4>

                    {

                        dashboard.today_tasks.length === 0 ?

                        (

                            <div className="text-center py-5">

                                <h1>

                                    📭

                                </h1>

                                <h5>

                                    No reminders for today

                                </h5>

                                <p className="text-muted">

                                    Enjoy your day! 🎉

                                </p>

                            </div>

                        )

                        :

                        dashboard.today_tasks.map((task) => (

                            <div

                                key={task.id}

                                className="d-flex justify-content-between align-items-center border-bottom py-3"

                            >

                                <div>

                                    <h6 className="mb-1 fw-bold">

                                        {task.task_name}

                                    </h6>

                                    <small className="text-muted">

                                        {task.description}

                                    </small>

                                </div>

                                <span className="badge bg-success fs-6">

                                    {task.time}

                                </span>

                            </div>

                        ))

                    }

                </div>

            </div>

        </MainLayout>

    );

}

export default Dashboard;