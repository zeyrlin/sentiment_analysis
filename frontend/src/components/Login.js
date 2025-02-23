import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAdminLoggedIn, setIsCustomerLoggedIn, setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("CUSTOMER");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", {
                username,
                password,
            });
            if (response.status === 200) {
                setToken(response.data);
                localStorage.setItem("token", response.data);
                localStorage.setItem("role", role);
                if (role === "ADMIN") {
                    setIsAdminLoggedIn(true);
                } else {
                    setIsCustomerLoggedIn(true);
                }
                navigate("/");
            }
        } catch (err) {
            setError("Invalid username or password.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="CUSTOMER">Customer</option>
                    <option value="ADMIN">Admin</option>
                </select>
                <br />
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Login;