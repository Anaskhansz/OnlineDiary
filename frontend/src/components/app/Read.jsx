import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8000/getTodos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setTasks(data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <div className="container">
        <div className="read">
          <h2 className="text-center" style={{ marginBottom: "3rem" }}>
            Diary
          </h2>
          <div className="flex flex-column gap-4">
            {tasks?.length > 0 ? (
              tasks.map((task) => (
                <div
                  className="todo card full-center "
                  style={{ alignItems: "flex-start" }}
                  key={task._id}
                >
                  <img
                    style={{ alignSelf: "center" }}
                    src={`http://localhost:8000/images/${task.image}`}
                    alt=""
                  />
                  <h3>
                    <span>Title</span> : {task.title}
                  </h3>
                  <h3>
                    <span>Description</span> : {task.description}
                  </h3>
                  <h3>
                    <span>Created Date</span> : {task.date}
                  </h3>
                  <div className="buttons flex  gap-2">
                    <Link
                      style={{ backgroundColor: "brown" }}
                      to={`/update/${task._id}/${task.title}/${task.description}`}
                    >
                      Update
                    </Link>

                    <Link
                      style={{ backgroundColor: "red" }}
                      to={`/delete/${task._id}`}
                    >
                      Delete
                    </Link>
                  </div>
                  <hr />
                </div>
              ))
            ) : (
              <div
                className="flex flex-column full-center gap-4 center"
                style={{ marginTop: "3rem" }}
              >
                <h2 className="text-center">No tasks found</h2>
                <Link to="/create" style={{ backgroundColor: "green" }}>
                  Create Task
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Read;
