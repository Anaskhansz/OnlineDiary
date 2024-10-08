import React from "react";
import { Link } from "react-router-dom";

const Account = () => {
  return (
    <>
      <div className="container">
        <div className="account card flex flex-column gap-4">
          <h2 className="text-center">
            Welcom, {localStorage.getItem("username")}
          </h2>
          <div className="buttons flex full-center gap-2">
            <Link
              to="/logout"
              style={{ backgroundColor: "brown", textAlign: "center" }}
            >
              Logout
            </Link>{" "}
            <Link
              to="/deleteAccount"
              style={{ backgroundColor: "red", textAlign: "center" }}
            >
              DeleteAccount
            </Link>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
