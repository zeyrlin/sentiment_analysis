import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAdminLoggedIn, setIsCustomerLoggedIn, setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", {
                username,
                password,
            });

            const token = response.data.token;
            localStorage.setItem("token", token);

            // Determine user role
            const role = response.data.role || "CUSTOMER"; // Default to CUSTOMER if role is not returned
            localStorage.setItem("role", role);

            setToken(token);
            if (role === "ADMIN") {
                setIsAdminLoggedIn(true);
                navigate("/admin");
            } else {
                setIsCustomerLoggedIn(true);
                navigate("/menu");
            }
        } catch (error) {
            alert("Invalid username or password.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;