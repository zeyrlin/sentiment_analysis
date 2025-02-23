// frontend/src/components/AdminDashboard.js
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const AdminDashboard = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <Link to="/admin/menu">
                <Button variant="primary" className="mb-2">
                    Manage Menu
                </Button>
            </Link>
            <br />
            <Link to="/admin/orders">
                <Button variant="primary" className="mb-2">
                    Manage Orders
                </Button>
            </Link>
            <br />
            <Link to="/admin/tables">
                <Button variant="primary" className="mb-2">
                    Manage Tables
                </Button>
            </Link>
            <br />
            <Link to="/admin/promotions">
                <Button variant="primary" className="mb-2">
                    Create Promotions
                </Button>
            </Link>
            <br />
            <Link to="/admin/feedback">
                <Button variant="primary" className="mb-2">
                    View Feedback Sentiment
                </Button>
            </Link>
        </div>
    );
};

export default AdminDashboard;