import React from "react";
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "../../Utils";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  let navigate = useNavigate();
  let handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    handleSuccess("Logout successful");
    setTimeout(() => {
      // relaod page
      window.location.reload();
    }, 1000);
  };
  return (
    <>
      <div className="container">
        <div className="deleteAccount width-full full-center">
          <form className="card" onSubmit={handleLogout}>
            <p>Do you really want to Logout you account from this device?</p>
            <button type="submit" style={{ backgroundColor: "brown" }}>
              Logout
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Logout;
