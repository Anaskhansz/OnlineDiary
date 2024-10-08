import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../Utils";
import { ToastContainer } from "react-toastify";

const DeleteAccount = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    if (!token) {
      handleError(
        "You are not logged in. Please log in to delete your account."
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/auth/deleteAccount", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      });
      const data = await response.json();
      console.log(data);

      if (data.message) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        handleSuccess(data.message);

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        handleError(data.message || "Failed to delete account.");
      }
    } catch (error) {
      handleError(
        "An error occurred while trying to delete your account. Please try again later. 😔"
      );
    }
  };

  return (
    <>
      <div className="container">
        <div className="deleteAccount width-full full-center">
          <form className="card" onSubmit={handleDeleteAccount}>
            <p>Do you really want to delete this account?</p>
            <button type="submit" style={{ backgroundColor: "red" }}>
              Delete Account
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default DeleteAccount;
