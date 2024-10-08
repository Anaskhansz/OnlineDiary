let router = require("express").Router();
let validation = require("../middlewares/AuthValidation");
let AuthController = require("../controllers/AuthController");
const Todo = require("../models/AuthModel");

router.post("/signup", validation.validateSignup, AuthController.signup);
router.post("/login", validation.validateLogin, AuthController.login);
router.delete("/deleteAccount", AuthController.deleteAccount);

router.post("/refresh", AuthController.refresh);

router.get("/getUsers", (req, res) => {
  Todo.find({}).then((data) => {
    res.status(200).json({
      message: "Users fetched successfully",
      success: true,
      error: false,
      data: data,
    });
  });
});
module.exports = router;
