let router = require("express").Router();
let Todo = require("../models/TodoModel");
let TodoController = require("../controllers/TodoController");
let upload = require("../middlewares/Multer");
router.post("/addTodo", upload.single("image"), TodoController.addTodo);
router.get("/getTodos", TodoController.getTodos);
router.patch(
  "/updateTodo/:id",
  upload.single("image"),
  TodoController.updateTodo
);
router.delete("/deleteTodo/:id", TodoController.deleteTodo);

router.get("/get", (req, res) => {
  Todo.find({}).then((data) => {
    res.status(200).json({
      message: "Todos fetched successfully",
      success: true,
      error: false,
      data: data,
    });
  });
});

module.exports = router;
