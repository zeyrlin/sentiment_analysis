// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import CustomerMenu from "./components/CustomerMenu";
import CustomerOrder from "./components/CustomerOrder";
import CustomerFeedback from "./components/CustomerFeedback";
import AdminDashboard from "./components/AdminDashboard";
import AdminMenuManagement from "./components/AdminMenuManagement";
import AdminOrderManagement from "./components/AdminOrderManagement";
import AdminTableManagement from "./components/AdminTableManagement";
import AdminFeedbackSentiment from "./components/AdminFeedbackSentiment";
import AdminPromotions from "./components/AdminPromotions";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Button } from "react-bootstrap";

const App = () => {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);

    useEffect(() => {
        if (token) {
            const userRole = localStorage.getItem("role");
            if (userRole === "ADMIN") {
                setIsAdminLoggedIn(true);
            } else if (userRole === "CUSTOMER") {
                setIsCustomerLoggedIn(true);
            }
        }
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setIsAdminLoggedIn(false);
        setIsCustomerLoggedIn(false);
        setToken("");
    };

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>Cafe Management System</h1>
                    {token ? (
                        <Button variant="secondary" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <Link to="/login">
                            <Button variant="primary">Login</Button>
                        </Link>
                    )}
                </header>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/login"
                        element={
                            <Login
                                setIsAdminLoggedIn={setIsAdminLoggedIn}
                                setIsCustomerLoggedIn={setIsCustomerLoggedIn}
                                setToken={setToken}
                            />
                        }
                    />
                    <Route
                        path="/menu"
                        element={
                            isCustomerLoggedIn ? (
                                <CustomerMenu token={token} />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/order"
                        element={
                            isCustomerLoggedIn ? (
                                <CustomerOrder token={token} />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/feedback"
                        element={
                            isCustomerLoggedIn ? (
                                <CustomerFeedback token={token} />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            isAdminLoggedIn ? (
                                <AdminDashboard />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/admin/menu"
                        element={
                            isAdminLoggedIn ? (
                                <AdminMenuManagement token={token} />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/admin/orders"
                        element={
                            isAdminLoggedIn ? (
                                <AdminOrderManagement token={token} />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/admin/tables"
                        element={
                            isAdminLoggedIn ? (
                                <AdminTableManagement token={token} />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/admin/promotions"
                        element={
                            isAdminLoggedIn ? (
                                <AdminPromotions token={token} />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/admin/feedback"
                        element={
                            isAdminLoggedIn ? (
                                <AdminFeedbackSentiment token={token} />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;