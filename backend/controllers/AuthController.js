require("dotenv").config();
const bcrypt = require("bcrypt");
let User = require("../models/AuthModel");
let jwt = require("jsonwebtoken");
let fs = require("fs");
let Todo = require("../models/TodoModel");
let signup = (req, res) => {
  let { name, email, password } = req.body;

  User.findOne({ email: email }).then((data) => {
    if (data) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
        error: true,
        data: null,
      });
    }

    // Hash the password before saving
    bcrypt.hash(password, 10).then((hashedPassword) => {
      let newUser = new User({ name, email, password: hashedPassword });

      newUser
        .save()
        .then((data) => {
          jwt.sign(
            { data },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION_TIME },
            (err, token) => {
              if (err) {
                return res.status(400).json({
                  message: "Something went wrong",
                  success: false,
                  error: true,
                  data: err.message,
                });
              }
              res.status(200).json({
                message: "User created successfully",
                success: true,
                error: false,
                data: { ...data._doc, token }, // Use _doc to avoid Mongoose document issues
              });
            }
          );
        })
        .catch((err) => {
          res.status(400).json({
            message: "Something went wrong",
            success: false,
            error: true,
            data: err.message,
          });
        });
    });
  });
};

let login = (req, res) => {
  let { email, password } = req.body;

  User.findOne({ email: email }).then((data) => {
    if (!data) {
      return res.status(400).json({
        message: "User not found",
        success: false,
        error: true,
        data: null,
      });
    }

    // Compare the provided password with the stored hashed password
    bcrypt.compare(password, data.password).then((isMatch) => {
      if (isMatch) {
        jwt.sign(
          { data },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRATION_TIME },
          (err, token) => {
            if (err) {
              return res.status(400).json({
                message: "Something went wrong",
                success: false,
                error: true,
                data: err.message,
              });
            }
            res.status(200).json({
              message: "User logged in successfully",
              success: true,
              error: false,
              data: { ...data._doc, token }, // Use _doc to avoid Mongoose document issues
            });
          }
        );
      } else {
        return res.status(400).json({
          message: "Invalid credentials",
          success: false,
          error: true,
          data: null,
        });
      }
    });
  });
};

const deleteAccount = (req, res) => {
  const { token } = req.body; // Get the token from the request body

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid token, please log in again",
        success: false,
      });
    }

    // Log the decoded token to verify it's working

    const email = decoded.data.email; // Extract the email from the decoded token

    // Delete all todos associated with the user's email
    let todos = await Todo.find({ email });

    // Delete pictures in the upload folder
    todos.forEach((todo) => {
      if (todo.image) {
        const filePath = `${__dirname}/../uploads/${todo.image}`;

        fs.unlinkSync(filePath);
      }
    });

    await Todo.deleteMany({ email });

    const user = await User.findOneAndDelete({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User   not found", success: false });
    }

    res.json({ message: "User   deleted successfully", success: true });
  });
};
const refresh = (req, res) => {
  const { token } = req.body;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid token, please log in again",
        success: false,
      });
    }

    res.status(200).json({
      message: "Token is valid",
      success: true,
      data: decoded,
    });
  });
};

module.exports = {
  signup,
  login,
  deleteAccount,
  refresh,
};
