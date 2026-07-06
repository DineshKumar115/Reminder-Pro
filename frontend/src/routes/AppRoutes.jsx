import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import ReminderList from "../pages/reminders/ReminderList";
import AddReminder from "../pages/reminders/AddReminder";
import EditReminder from "../pages/reminders/EditReminder";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/reminders"
                    element={
                        <ProtectedRoute>
                            <ReminderList />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/add-reminder"
                    element={
                        <ProtectedRoute>
                            <AddReminder />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/edit-reminder/:id"
                    element={
                        <ProtectedRoute>
                            <EditReminder />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}
<Route

    path="*"

    element={<NotFound />}

/>

export default AppRoutes;