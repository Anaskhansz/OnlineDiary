import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleSuccess, handleError } from "../../Utils";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState(""); // Consistent naming
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name: username,
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:8000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.message || "Network response was not ok";
        handleError(errorMsg);
        return;
      }

      handleSuccess(data.message || "Signup successful!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error(error); // Changed to console.error

      handleError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="container">
        <div className="signup full-width full-center">
          <form className="card" onSubmit={handleSubmit}>
            <h1 className="text-center">Signup</h1>
            <input
              type="text"
              placeholder="Username"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Consistent naming
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Signup</button>
            <p>
              Already have an account? <Link to="/login">Login</Link>{" "}
              {/* Added space */}
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
