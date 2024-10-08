import React, { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { handleError } from "./Utils";

const RefreshHandler = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        try {
          const response = await fetch("http://localhost:8000/auth/refresh", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          });
          const data = await response.json();

          if (data.success) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            setIsAuthenticated(false);
            handleError(data.message);
          }
        } catch (error) {
          console.error(error);
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          setIsAuthenticated(false);
          handleError("Session expired. Please log in again.");
        }
      }
    };

    checkToken();
  }, [token, setIsAuthenticated, location]);

  // Redirect to home if the user is authenticated and tries to access login or signup
  if (
    token &&
    (location.pathname === "/login" || location.pathname === "/signup")
  ) {
    return <Navigate to="/" />;
  }

  return null;
};

export default RefreshHandler;
