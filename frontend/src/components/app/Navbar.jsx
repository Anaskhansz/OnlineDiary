import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ isAuthenticated }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleToggle = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className="navbar">
      <div className="container ">
        <div className="nav flex space-between align-center">
          <li className="cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <h2 onClick={handleToggle} className="cursor-pointer">
            {isOpen ? "×" : "☰"}
          </h2>

          <ul className={`links ${isOpen ? "open" : "close"}`}>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/read">My Diary</Link>
                </li>
                <li>
                  <Link to="/create">New Entry</Link>
                </li>

                <li>
                  <Link to="/account">Account</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
