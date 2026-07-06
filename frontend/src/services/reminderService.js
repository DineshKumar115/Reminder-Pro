import api from "./api";

// ------------------------------------
// Get All Reminders
// ------------------------------------

export const getReminders = async () => {

    const response = await api.get("/reminders");

    return response.data;

};

// ------------------------------------
// Create Reminder
// ------------------------------------

export const createReminder = async (data) => {

    const response = await api.post(

        "/reminders",

        data

    );

    return response.data;

};

// ------------------------------------
// Get Reminder By Id
// ------------------------------------

export const getReminderById = async (id) => {

    const response = await api.get(

        `/reminders/${id}`

    );

    return response.data;

};

// ------------------------------------
// Update Reminder
// ------------------------------------

export const updateReminder = async (

    id,

    data

) => {

    const response = await api.put(

        `/reminders/${id}`,

        data

    );

    return response.data;

};

// ------------------------------------
// Delete Reminder
// ------------------------------------

export const deleteReminder = async (id) => {

    const response = await api.delete(

        `/reminders/${id}`

    );

    return response.data;

};

// ------------------------------------
// Dashboard
// ------------------------------------

export const getDashboardStats = async () => {

    const response = await api.get(

        "/dashboard"

    );

    return response.data;

};