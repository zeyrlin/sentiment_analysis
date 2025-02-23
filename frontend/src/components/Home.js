import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Cafe Management System</h1>
            <Link to="/login">
                <button>Login</button>
            </Link>
        </div>
    );
};

export default Home;