import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";

import MainLayout from "../../layouts/MainLayout";

import {
    getReminderById,
    updateReminder
} from "../../services/reminderService";

import "react-datepicker/dist/react-datepicker.css";

function EditReminder() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const [loading, setLoading] = useState(false);

    const loadReminder = async () => {

        try {

            const response = await getReminderById(id);

            const reminder = response.data;

            setTaskName(reminder.task_name);

            setDescription(reminder.description);

            setSelectedDate(new Date(reminder.date));

            const [hours, minutes, seconds] = reminder.time.split(":");

            const time = new Date();

            time.setHours(hours);

            time.setMinutes(minutes);

            time.setSeconds(seconds);

            setSelectedTime(time);

        }

        catch (error) {

            toast.error("Unable to load reminder");

        }

    };

    useEffect(() => {

        loadReminder();

    }, []);

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

            await updateReminder(

                id,

                {

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

                }

            );

            toast.success("Reminder Updated Successfully");

            navigate("/reminders");

        }

        catch (error) {

            toast.error(

                error.response?.data?.detail ||

                "Failed to update reminder"

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

                            <h2 className="fw-bold mb-2">

                                ✏ Edit Reminder

                            </h2>

                            <p className="text-muted mb-4">

                                Update your reminder details below.

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
                                        placeholder="Enter description"
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
                                        className="btn btn-success"
                                        disabled={loading}
                                    >

                                        {

                                            loading

                                                ? "Updating..."

                                                : "💾 Update Reminder"

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

export default EditReminder;