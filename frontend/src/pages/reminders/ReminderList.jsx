import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "../../components/common/Loader";
import DeleteModal from "../../components/common/DeleteModal";
import MainLayout from "../../layouts/MainLayout";

import {
    getReminders,
    deleteReminder
} from "../../services/reminderService";

function ReminderList() {

    const [reminders, setReminders] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedReminderId, setSelectedReminderId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const loadReminders = async () => {

        try {

            setLoading(true);

            const response = await getReminders();

            setReminders(response.data);

        }

        catch (error) {

            toast.error("Unable to load reminders");

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadReminders();

    }, []);

    const openDeleteModal = (id) => {

        setSelectedReminderId(id);

        setShowDeleteModal(true);

    };

    const handleDelete = async () => {

        try {

            setDeleteLoading(true);

            await deleteReminder(selectedReminderId);

            toast.success("Reminder Deleted Successfully");

            setShowDeleteModal(false);

            loadReminders();

        }

        catch {

            toast.error("Failed to delete reminder");

        }

        finally {

            setDeleteLoading(false);

        }

    };

    const filteredReminders = reminders.filter((item) =>
        item.task_name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const formatDate = (date) => {

        return new Date(date).toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };

    const formatTime = (time) => {

        const [hour, minute] = time.split(":");

        const date = new Date();

        date.setHours(hour);

        date.setMinutes(minute);

        return date.toLocaleTimeString(
            "en-US",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    };

    if (loading) {

        return <Loader />;

    }

    return (

        <MainLayout>

            {/* Header */}

            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold mb-1">

                        📋 My Reminders

                    </h2>

                    <p className="text-muted mb-0">

                        Manage, edit and organize all your reminders.

                    </p>

                </div>

                <div className="d-flex gap-2 mt-3 mt-md-0">

                    <input

                        type="text"

                        className="form-control rounded-pill"

                        placeholder="🔍 Search by task name..."

                        value={search}

                        onChange={(e) =>
                            setSearch(e.target.value)
                        }

                        style={{

                            width: "260px"

                        }}

                    />

                    <Link

                        to="/add-reminder"

                        className="btn btn-primary rounded-pill px-4"

                    >

                        ➕ Add Reminder

                    </Link>

                </div>

            </div>

            {/* Table */}

            <div

                className="card border-0 shadow-sm"

                style={{

                    borderRadius: "18px"

                }}

            >

                <div className="table-responsive">

                    <table className="table align-middle table-hover mb-0">

                        <thead

                            style={{

                                background: "#4F46E5",

                                color: "white"

                            }}

                        >

                            <tr>

                                <th className="ps-4">

                                    Task

                                </th>

                                <th>

                                    Description

                                </th>

                                <th>

                                    Date

                                </th>

                                <th>

                                    Time

                                </th>

                                <th className="text-center">

                                    Actions

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredReminders.length === 0 ?

                                (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="text-center py-5"
                                        >

                                            <div
                                                style={{
                                                    fontSize: "70px"
                                                }}
                                            >

                                                📭

                                            </div>

                                            <h4>

                                                No reminders found

                                            </h4>

                                            <p className="text-muted">

                                                Click Add Reminder to create your first reminder.

                                            </p>

                                            <Link

                                                to="/add-reminder"

                                                className="btn btn-primary rounded-pill"

                                            >

                                                ➕ Add Reminder

                                            </Link>

                                        </td>

                                    </tr>

                                )

                                :

                                filteredReminders.map((item) => (

                                    <tr key={item.id}>

                                        <td className="ps-4">

                                            <div className="fw-bold">

                                                {item.task_name}

                                            </div>

                                        </td>

                                        <td>

                                            <span className="text-muted">

                                                {

                                                    item.description?.length > 45

                                                        ?

                                                        item.description.substring(0,45) + "..."

                                                        :

                                                        item.description

                                                }

                                            </span>

                                        </td>

                                        <td>

                                            <span className="badge bg-primary rounded-pill px-3 py-2">

                                                📅 {formatDate(item.date)}

                                            </span>

                                        </td>

                                        <td>

                                            <span className="badge bg-success rounded-pill px-3 py-2">

                                                🕒 {formatTime(item.time)}

                                            </span>

                                        </td>

                                        <td className="text-center">

                                            <Link

                                                to={`/edit-reminder/${item.id}`}

                                                className="btn btn-outline-warning rounded-pill btn-sm me-2"

                                            >

                                                ✏ Edit

                                            </Link>

                                            <button

                                                className="btn btn-outline-danger rounded-pill btn-sm"

                                                onClick={() =>
                                                    openDeleteModal(item.id)
                                                }

                                            >

                                                🗑 Delete

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

            <DeleteModal

                show={showDeleteModal}

                title="Delete Reminder"

                message="Are you sure you want to delete this reminder?"

                loading={deleteLoading}

                onCancel={() =>
                    setShowDeleteModal(false)
                }

                onConfirm={handleDelete}

            />

        </MainLayout>

    );

}

export default ReminderList;