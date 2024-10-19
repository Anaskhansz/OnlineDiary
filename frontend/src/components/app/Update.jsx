import React, { useState } from "react";
import { handleSuccess, handleError } from "../../Utils";
import { ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  let navigate = useNavigate();
  let { id, tit, desc } = useParams();
  const [title, setTitle] = useState(tit);
  const [description, setDescription] = useState(desc);
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (title !== "") {
      formData.append("title", title);
    }
    if (description !== "") {
      formData.append("description", description);
    }
    if (image) {
      formData.append("image", image);
    }

    fetch(`http://localhost:8000/updateTodo/${id}`, {
      method: "PATCH",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        handleSuccess(data.message);
        setTimeout(() => {
          navigate("/read");
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        handleError(error.message);
      });
  };

  return (
    <>
      <div className="container">
        <div className="create">
          <form className="card" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Task Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Task Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="file"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
            />

            <button type="submit">Update Task</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Update;
