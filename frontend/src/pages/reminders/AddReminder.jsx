import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";

import MainLayout from "../../layouts/MainLayout";
import { createReminder } from "../../services/reminderService";

import "react-datepicker/dist/react-datepicker.css";

function AddReminder() {

    const navigate = useNavigate();

    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!taskName.trim()) {

            toast.error("Task Name is required");

            return;

        }

        if (!selectedDate) {

            toast.error("Please select a date");

            return;

        }

        if (!selectedTime) {

            toast.error("Please select a time");

            return;

        }

        try {

            setLoading(true);

            await createReminder({

                task_name: taskName,

                description,

                date: selectedDate
                    .toISOString()
                    .split("T")[0],

                time: selectedTime.toLocaleTimeString(
                    "en-GB",
                    {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false
                    }
                )

            });

            toast.success("Reminder Added Successfully");

            navigate("/reminders");

        }

        catch (error) {

            toast.error(

                error.response?.data?.detail ||

                "Failed to create reminder"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <MainLayout>

            <div className="row justify-content-center">

                <div className="col-lg-8">

                    <div
                        className="card shadow border-0"
                        style={{ borderRadius: "20px" }}
                    >

                        <div className="card-body p-4">

                            <h2 className="fw-bold mb-3">

                                ➕ Add Reminder

                            </h2>

                            <p className="text-muted mb-4">

                                Fill in the details below to create a new reminder.

                            </p>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">

                                        Task Name

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter task name"
                                        value={taskName}
                                        onChange={(e) =>
                                            setTaskName(e.target.value)
                                        }
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">

                                        Description

                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        placeholder="Enter description (optional)"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    />

                                </div>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label fw-semibold">

                                            📅 Date

                                        </label>

                                        <DatePicker
                                            selected={selectedDate}
                                            onChange={(date) =>
                                                setSelectedDate(date)
                                            }
                                            dateFormat="dd/MM/yyyy"
                                            minDate={new Date()}
                                            placeholderText="Select Date"
                                            className="form-control"
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label fw-semibold">

                                            🕒 Time

                                        </label>

                                        <DatePicker
                                            selected={selectedTime}
                                            onChange={(time) =>
                                                setSelectedTime(time)
                                            }
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={15}
                                            timeCaption="Time"
                                            dateFormat="hh:mm aa"
                                            placeholderText="Select Time"
                                            className="form-control"
                                        />

                                    </div>

                                </div>

                                <div className="d-flex justify-content-end gap-2 mt-4">

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() =>
                                            navigate("/reminders")
                                        }
                                    >

                                        Cancel

                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >

                                        {

                                            loading

                                                ? "Saving..."

                                                : "💾 Save Reminder"

                                        }

                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default AddReminder;