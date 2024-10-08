import React, { useState } from "react";
import { handleSuccess, handleError } from "../../Utils";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";

const Update = () => {
  let { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [completed, setCompleted] = useState("");

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
    if (completed !== "") {
      formData.append("completed", completed);
    }

    fetch(`http://localhost:8000/updateTodo/${id}`, {
      method: "PATCH",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        handleSuccess(data.message);
      })
      .catch((error) => console.error(error));
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
            <select
              name="completed"
              value={completed}
              onChange={(e) => setCompleted(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
            <button type="submit">Update Task</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Update;
