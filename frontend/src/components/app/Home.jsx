import React from "react";
import { Link } from "react-router-dom";

const Home = ({ isAuthenticated }) => {
  return (
    <>
      <div className="container">
        <div
          className="home flex flex-column gap-4 justify-center"
          style={{ alignItems: "flex-start" }}
        >
          <h2>Welcome to the free online diary</h2>
          <p style={{ textWrap: "wrap" }}>
            This is an online diary service, providing personal diaries and
            journals - it's free at my-diary.org! Our focus is on security and
            privacy, and all diaries are private by default. Go ahead and
            register your own public or private diary today.
          </p>
          {isAuthenticated ? (
            <>
              <Link to="/account" className="text-center">
                Manage Your Account
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="text-center"
                style={{ backgroundColor: "#8BC34A" }}
              >
                Create an Account
              </Link>
              <Link
                to="/login"
                className="text-center"
                style={{ backgroundColor: "#03A9F4" }}
              >
                Log In
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
