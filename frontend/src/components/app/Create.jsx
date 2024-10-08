import React, { useState } from "react";
import { handleSuccess, handleError } from "../../Utils";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Create = () => {
  let navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("token", localStorage.getItem("token"));
    formData.append("image", image);

    fetch("http://localhost:8000/addTodo", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        handleSuccess("Task Created Successfully");
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
          <h3 className="text-center " style={{ marginBottom: "3rem" }}>
            Create new Entry
          </h3>
          <form className="card" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Task Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Task Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="file"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
            <button type="submit">Create Task</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Create;
