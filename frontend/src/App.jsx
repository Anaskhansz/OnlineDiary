import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Login,
  Signup,
  DeleteAccount,
  Logout,
  Account,
} from "./components/Auth/index";
import {
  Create,
  Update,
  Delete,
  Home,
  Navbar,
  PageNotFound,
} from "./components/app/index";
import RefreshHandler from "./RefreshHandler";
import Read from "./components/app/Read";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ children }) => {
    console.log("isAuthenticated:", isAuthenticated); // Debugging line
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      {/* RefreshHandler */}
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        {/* signup */}
        <Route path="/signup" element={<Signup />} />
        {/* login */}
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        {/* logout */}
        <Route
          path="/logout"
          element={
            <PrivateRoute>
              <Logout />
            </PrivateRoute>
          }
        />
        {/* deleteAccount */}
        <Route
          path="/deleteAccount"
          element={
            <PrivateRoute>
              <DeleteAccount />
            </PrivateRoute>
          }
        />
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          }
        />
        {/* Home */}
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
        {/* create */}
        <Route
          path="/read"
          element={
            <PrivateRoute>
              <Read />
            </PrivateRoute>
          }
        />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <Create />
            </PrivateRoute>
          }
        />

        <Route
          path="/update/:id/:tit/:desc"
          element={
            <PrivateRoute>
              <Update />
            </PrivateRoute>
          }
        />
        <Route
          path="/delete/:id"
          element={
            <PrivateRoute>
              <Delete />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
