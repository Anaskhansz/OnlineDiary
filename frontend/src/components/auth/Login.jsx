import React from "react";
import { ToastContainer } from "react-toastify";
import { handleSuccess, handleError } from "../../Utils";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate(); // Corrected to useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
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

      // Store the token and username in localStorage
      if (data.data.token && data.data.name) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("username", data.data.name);
      }

      handleSuccess(data.message || "Login successful!");

      // Using navigate instead of Navigate
      setTimeout(() => {
        navigate("/"); // Corrected to use navigate function
      }, 1000);
    } catch (error) {
      console.error(error);
      handleError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="container">
        <div className="Login full-width full-center">
          <form className="card" onSubmit={handleSubmit}>
            <h1 className="text-center">Login</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              value={email} // Controlled input
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              value={password} // Controlled input
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
