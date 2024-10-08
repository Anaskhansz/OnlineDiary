import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div className="container">
        <div className="data flex flex-column gap-4 full-center">
          <h1>Oops, Something Went Wrong!</h1>
          <h2>We Can't Find the Page You're Looking For</h2>
          <p>
            Sorry, the page you're trying to access doesn't exist or has been
            removed. You can try searching for what you're looking for or head
            back to our homepage.
          </p>
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
