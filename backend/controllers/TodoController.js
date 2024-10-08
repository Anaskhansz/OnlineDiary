let fs = require("fs");
let jwt = require("jsonwebtoken");
const Todo = require("../models/TodoModel");

/**
 * Add Todo
 */
const addTodo = async (req, res) => {
  try {
    const { title, description, token } = req.body;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        res.status(401).json({
          message: "Invalid token",
          success: false,
          error: true,
          data: err.message,
        });
        return;
      }

      const email = decoded.data.email;
      const image = req.file.filename;
      const newTodo = new Todo({ title, image, description, email });
      const data = await newTodo.save();

      res.status(201).json({
        message: "Todo added successfully",
        success: true,
        error: false,
        data,
      });
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: true,
      data: err.message,
    });
  }
};

/**
 * Get Todos
 */
const getTodos = async (req, res) => {
  try {
    let token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
        error: true,
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid token",
          success: false,
          error: true,
          data: err.message,
        });
      }

      const email = decoded.data.email;
      const data = await Todo.find({ email });

      res.status(200).json({
        message: "Todos fetched successfully",
        success: true,
        error: false,
        data,
      });
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: true,
      token: req.headers.authorization,
      data: err.message,
    });
  }
};
/**
 * Update Todo
 */
const updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, completed } = req.body; // Added completed here
    const image = req.file ? req.file.filename : undefined;

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
        success: false,
        error: true,
      });
    }

    const updatedData = {
      title: title !== undefined ? title : todo.title,
      description: description !== undefined ? description : todo.description,
      completed: completed !== undefined ? completed : todo.completed,
      image: image !== undefined ? image : todo.image,
    };

    // Delete old image if it exists and new image is provided
    if (todo.image && image) {
      const filePath = `${__dirname}/../uploads/${todo.image}`;
      fs.unlinkSync(filePath);
    }

    await Todo.findOneAndUpdate({ _id: id }, updatedData, { new: true });

    res.status(200).json({
      message: "Todo updated successfully",
      success: true,
      error: false,
      data: updatedData,
    });
  } catch (err) {
    res.status(500).json({
      // Changed status code to 500
      message: "Something went wrong",
      success: false,
      error: true,
      data: err.message,
    });
  }
};

/**
 * Delete Todo
 */
const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedData = await Todo.findByIdAndDelete(id);

    if (!deletedData) {
      return res.status(404).json({
        message: "Todo not found",
        success: false,
        error: true,
      });
    }

    if (deletedData.image) {
      const filePath = `${__dirname}/../uploads/${deletedData.image}`;
      fs.unlinkSync(filePath);
    }

    res.status(200).json({
      message: "Todo deleted successfully",
      success: true,
      error: false,
      data: deletedData,
    });
  } catch (err) {
    res.status(500).json({
      // Changed status code to 500
      message: "Something went wrong",
      success: false,
      error: true,
      data: err.message,
    });
  }
};

module.exports = {
  addTodo,
  getTodos,
  updateTodo,
  deleteTodo,
};
