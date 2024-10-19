import React, { useState } from "react";
import { handleSuccess, handleError } from "../../Utils";
import { ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const Delete = () => {
  let navigate = useNavigate();
  let { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8000/deleteTodo/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        handleSuccess(data.message);
        setTimeout(() => {
          navigate("/read");
        }, 1000);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="container">
        <div className="create">
          <form className="card" onSubmit={handleSubmit}>
            <h2 className="text-center">
              Are You sure wwnat to delete this taks
            </h2>
            <button
              type="submit"
              style={{ backgroundColor: "red", alignSelf: "center" }}
            >
              Delete Task
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Delete;
